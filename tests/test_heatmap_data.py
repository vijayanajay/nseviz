import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app import create_app
from unittest.mock import patch
import pandas as pd

@pytest.fixture
def client():
    app = create_app()
    app.testing = True
    app.config["PROPAGATE_EXCEPTIONS"] = False
    return app.test_client()

def test_missing_index_param(client):
    resp = client.get('/api/heatmap-data?sector=FINANCE')
    assert resp.status_code == 400
    data = resp.get_json()
    assert data['error']['code'] == 'INVALID_PARAM'
    assert 'index' in data['error']['message']

def test_invalid_sector_param(client):
    resp = client.get('/api/heatmap-data?index=NIFTY50&sector=INVALID')
    assert resp.status_code == 400
    data = resp.get_json()
    assert data['error']['code'] == 'INVALID_PARAM'
    assert 'sector' in data['error']['message']

def test_internal_server_error(client):
    resp = client.get('/api/heatmap-data?index=NIFTY50&sector=FINANCE&force_error=1')
    assert resp.status_code == 500
    data = resp.get_json()
    assert data['error']['code'] == 'INTERNAL_ERROR'
    assert 'Server error' in data['error']['message']

def test_yfinance_integration(client):
    # Mock yfinance download to return a DataFrame with expected columns
    mock_df = pd.DataFrame({
        'Open': [1000.0],
        'High': [1050.0],
        'Low': [995.0],
        'Close': [1020.0],
        'Volume': [100000],
    }, index=pd.to_datetime(['2024-04-01']))
    with patch('yfinance.download', return_value=mock_df):
        resp = client.get('/api/heatmap-data?index=NIFTY50&sector=FINANCE')
        assert resp.status_code == 200
        data = resp.get_json()
        assert data['index'] == 'NIFTY50'
        assert data['sector'] == 'FINANCE'
        assert isinstance(data['data'], list)
        assert len(data['data']) > 0
        # Example: check keys and types in first item
        item = data['data'][0]
        for field in ['symbol', 'name', 'price', 'change', 'volume']:
            assert field in item, f"Missing field: {field}"
        assert isinstance(item['symbol'], str)
        assert isinstance(item['name'], str)
        assert isinstance(item['price'], float)
        assert isinstance(item['change'], float)
        assert isinstance(item['volume'], int)
        # Check static name mapping
        assert item['name'] == 'HDFC Bank' or item['name'] == 'Infosys Ltd'
        # Check volume matches mock
        assert item['volume'] == 100000

def test_sector_filtering(client):
    # Simulate NIFTY50 with two stocks, only one in FINANCE sector
    mock_stocks = [
        {"symbol": "HDFCBANK", "sector": "FINANCE", "price": 1600.5, "change": 1.2},
        {"symbol": "INFY", "sector": "IT", "price": 1400.0, "change": -0.5},
    ]
    import types
    def mock_download(symbol, period, **kwargs):
        import pandas as pd
        data = {
            'HDFCBANK': {'Open': [1580], 'Close': [1600.5], 'Volume': [100000]},
            'INFY': {'Open': [1410], 'Close': [1400.0], 'Volume': [80000]},
        }
        idx = pd.to_datetime(['2024-04-01'])
        df = pd.DataFrame({
            (s, k): v for s, vals in data.items() for k, v in vals.items()
        }, index=idx)
        return df
    with patch('yfinance.download', side_effect=mock_download):
        with patch('app.routes.get_sector_mapping', return_value={"HDFCBANK": "FINANCE", "INFY": "IT"}):
            with patch('app.routes.get_name_mapping', return_value={"HDFCBANK": "HDFC Bank", "INFY": "Infosys Ltd"}):
                resp = client.get('/api/heatmap-data?index=NIFTY50&sector=FINANCE')
                assert resp.status_code == 200
                data = resp.get_json()
                assert data['index'] == 'NIFTY50'
                assert data['sector'] == 'FINANCE'
                assert isinstance(data['data'], list)
                # Only HDFCBANK should be present
                assert any(stock['symbol'] == 'HDFCBANK' for stock in data['data'])
                assert not any(stock['symbol'] == 'INFY' for stock in data['data'])
                # Validate schema for HDFCBANK
                hdfc = next(stock for stock in data['data'] if stock['symbol'] == 'HDFCBANK')
                for field in ['symbol', 'name', 'price', 'change', 'volume']:
                    assert field in hdfc, f"Missing field: {field}"
                assert hdfc['name'] == 'HDFC Bank'
                assert hdfc['volume'] == 100000
