import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app import create_app
from unittest.mock import patch
import pandas as pd
import itertools
import logging

# --- API contract schema helpers ---
def validate_success_response(data):
    assert isinstance(data, dict)
    for key in ["index", "data"]:
        assert key in data
    assert isinstance(data["index"], str)
    assert "sector" in data or data.get("sector") is None
    if "sector" in data:
        assert isinstance(data["sector"], str) or data["sector"] is None
    assert "date" in data
    assert isinstance(data["date"], str)
    assert isinstance(data["data"], list)
    assert "note" in data
    assert isinstance(data["note"], str)
    for item in data["data"]:
        for field in ["symbol", "name", "price", "change", "volume"]:
            assert field in item
        assert isinstance(item["symbol"], str)
        assert isinstance(item["name"], str)
        assert isinstance(item["price"], float)
        assert isinstance(item["change"], float)
        assert isinstance(item["volume"], int)

def validate_error_response(data):
    assert isinstance(data, dict)
    assert "error" in data
    error = data["error"]
    assert isinstance(error, dict)
    assert "code" in error and "message" in error
    assert isinstance(error["code"], str)
    assert isinstance(error["message"], str)

# --- Parameterized contract test (with patch/mocks) ---
import pytest

def mock_yfinance_download(*args, **kwargs):
    import pandas as pd
    idx = pd.to_datetime(['2024-04-01'])
    # Always return a DataFrame with one row for HDFCBANK
    df = pd.DataFrame({
        'Open': [1580.0],
        'High': [1600.5],
        'Low': [1575.0],
        'Close': [1600.5],
        'Volume': [100000],
    }, index=idx)
    return df

def mock_sector_mapping():
    return {"HDFCBANK": "FINANCE", "INFY": "IT"}

def mock_name_mapping():
    return {"HDFCBANK": "HDFC Bank", "INFY": "Infosys Ltd"}

@pytest.mark.parametrize("params,expected_status,expect_success", [
    ("index=NIFTY50", 200, True),
    ("index=NIFTY50&sector=FINANCE", 200, True),
    ("index=NIFTY50&category=ALL", 200, True),
    ("index=NIFTY50&category=LARGE_CAP&sector=IT", 200, True),
    ("index=NIFTYBANK&date=2024-04-01", 200, True),
    ("index=NIFTY50&date=notadate", 400, False),
    ("sector=FINANCE", 400, False),
    ("index=NIFTY50&sector=INVALID", 200, True),
    ("index=NIFTY50&category=INVALID", 200, True),
    ("", 400, False),
])
def test_api_contract_combinations(client, params, expected_status, expect_success):
    url = "/api/heatmap-data"
    if params:
        url += f"?{params}"
    with patch('yfinance.download', side_effect=mock_yfinance_download), \
         patch('app.routes.get_sector_mapping', side_effect=mock_sector_mapping), \
         patch('app.routes.get_name_mapping', side_effect=mock_name_mapping):
        resp = client.get(url)
        assert resp.status_code == expected_status
        data = resp.get_json()
        if expect_success:
            validate_success_response(data)
        else:
            validate_error_response(data)

# Edge case: test all param combinations for valid index
@pytest.mark.parametrize("category", [None, "ALL", "LARGE_CAP", "MID_CAP"])
@pytest.mark.parametrize("sector", [None, "FINANCE", "IT"])
@pytest.mark.parametrize("date", [None, "2024-04-01"])
def test_api_contract_matrix(client, category, sector, date):
    params = {"index": "NIFTY50"}
    if category: params["category"] = category
    if sector: params["sector"] = sector
    if date: params["date"] = date
    url = "/api/heatmap-data?" + "&".join(f"{k}={v}" for k, v in params.items())
    with patch('yfinance.download', side_effect=mock_yfinance_download), \
         patch('app.routes.get_sector_mapping', side_effect=mock_sector_mapping), \
         patch('app.routes.get_name_mapping', side_effect=mock_name_mapping):
        resp = client.get(url)
        assert resp.status_code == 200
        data = resp.get_json()
        validate_success_response(data)

# Edge case: invalid date format
@pytest.mark.parametrize("date", ["notadate", "01-04-2024", "20240401"])
def test_api_contract_invalid_date_formats(client, date):
    url = f"/api/heatmap-data?index=NIFTY50&date={date}"
    with patch('yfinance.download', side_effect=mock_yfinance_download), \
         patch('app.routes.get_sector_mapping', side_effect=mock_sector_mapping), \
         patch('app.routes.get_name_mapping', side_effect=mock_name_mapping):
        resp = client.get(url)
        assert resp.status_code == 400
        data = resp.get_json()
        validate_error_response(data)
        assert data["error"]["code"] == "INVALID_PARAM"
        assert "date" in data["error"]["message"]

# Edge case: missing all params

def test_api_contract_missing_all_params(client):
    with patch('yfinance.download', side_effect=mock_yfinance_download), \
         patch('app.routes.get_sector_mapping', side_effect=mock_sector_mapping), \
         patch('app.routes.get_name_mapping', side_effect=mock_name_mapping):
        resp = client.get("/api/heatmap-data")
        assert resp.status_code == 400
        data = resp.get_json()
        validate_error_response(data)
        assert data["error"]["code"] == "INVALID_PARAM"
        assert "index" in data["error"]["message"]

@pytest.fixture
def client():
    app = create_app()
    app.testing = True
    app.config["PROPAGATE_EXCEPTIONS"] = False
    # Ensure app.logger logs propagate to root logger for caplog
    app.logger.propagate = True
    return app.test_client()

def test_missing_index_param(client):
    resp = client.get('/api/heatmap-data?sector=FINANCE')
    assert resp.status_code == 400
    data = resp.get_json()
    assert data['error']['code'] == 'INVALID_PARAM'
    assert 'index' in data['error']['message']

def test_invalid_sector_param(client):
    resp = client.get('/api/heatmap-data?index=NIFTY50&sector=INVALID')
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["data"] == []
    assert "note" in data
    assert data["note"] == "No data available for the given parameters."

def test_invalid_category_param(client):
    resp = client.get('/api/heatmap-data?index=NIFTY50&category=INVALID')
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["data"] == []
    assert "note" in data
    assert data["note"] == "No data available for the given parameters."

def test_internal_server_error(client):
    from unittest.mock import patch
    def mock_download(*args, **kwargs):
        raise Exception('yfinance failed')
    with patch('yfinance.download', side_effect=mock_download):
        resp = client.get('/api/heatmap-data?index=NIFTY50&sector=FINANCE&force_error=1')
        assert resp.status_code == 500
        data = resp.get_json()
        assert data['error']['code'] == 'YFINANCE_ERROR'
        assert 'yfinance failed' in data['error']['message']

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
    import types
    import pandas as pd
    def mock_download(tickers, group_by=None, **kwargs):
        idx = pd.to_datetime(['2024-04-01'])
        columns = pd.MultiIndex.from_product([
            ['HDFCBANK', 'INFY'],
            ['Open', 'Close', 'Volume']
        ])
        data = [[1580, 1600.5, 100000, 1410, 1400.0, 80000]]
        df = pd.DataFrame(data, index=idx, columns=columns)
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

def test_date_param_valid(client):
    # Mock yfinance to return data for the requested date
    mock_df = pd.DataFrame({
        'Open': [1000.0],
        'High': [1050.0],
        'Low': [995.0],
        'Close': [1020.0],
        'Volume': [100000],
    }, index=pd.to_datetime(['2024-04-01']))
    with patch('yfinance.download', return_value=mock_df):
        resp = client.get('/api/heatmap-data?index=NIFTY50&sector=FINANCE&date=2024-04-01')
        assert resp.status_code == 200
        data = resp.get_json()
        assert data['index'] == 'NIFTY50'
        assert data['sector'] == 'FINANCE'
        assert isinstance(data['data'], list)
        assert len(data['data']) > 0
        item = data['data'][0]
        assert item['price'] == 1020.0

def test_date_param_invalid_format(client):
    resp = client.get('/api/heatmap-data?index=NIFTY50&sector=FINANCE&date=notadate')
    assert resp.status_code == 400
    data = resp.get_json()
    assert data['error']['code'] == 'INVALID_PARAM'
    assert 'date' in data['error']['message']

def test_date_param_no_data(client):
    # Mock yfinance to return an empty DataFrame for the date
    mock_df = pd.DataFrame()
    with patch('yfinance.download', return_value=mock_df):
        resp = client.get('/api/heatmap-data?index=NIFTY50&sector=FINANCE&date=2024-04-02')
        assert resp.status_code == 200
        data = resp.get_json()
        assert data['index'] == 'NIFTY50'
        assert data['sector'] == 'FINANCE'
        assert isinstance(data['data'], list)
        assert len(data['data']) == 0

def test_yfinance_download_exception(client):
    """Test that yfinance.download raising an exception returns a 500 error with correct JSON error format."""
    from unittest.mock import patch
    with patch('yfinance.download', side_effect=Exception('yfinance failed')):
        resp = client.get('/api/heatmap-data?index=NIFTY50&sector=FINANCE')
        assert resp.status_code == 500
        data = resp.get_json()
        assert data['error']['code'] == 'YFINANCE_ERROR'
        assert 'yfinance failed' in data['error']['message']

def test_yfinance_multiticker_dataframe(client):
    """Test endpoint with yfinance returning a multi-ticker DataFrame (columns are MultiIndex)."""
    import pandas as pd
    from unittest.mock import patch
    import numpy as np
    # Simulate yfinance multi-ticker DataFrame
    idx = pd.to_datetime(['2024-04-01'])
    columns = pd.MultiIndex.from_product([
        ['HDFCBANK', 'INFY'],
        ['Open', 'Close', 'Volume']
    ])
    data = np.array([
        [1580, 1600.5, 100000, 1410, 1400.0, 80000]
    ])
    df = pd.DataFrame(data, index=idx, columns=columns)
    with patch('yfinance.download', return_value=df):
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
                hdfc = next(stock for stock in data['data'] if stock['symbol'] == 'HDFCBANK')
                assert hdfc['name'] == 'HDFC Bank'
                assert hdfc['price'] == 1600.5
                assert hdfc['volume'] == 100000

@pytest.mark.parametrize("data_len,note_expected", [
    (0, "No data available for the given parameters."),
    (2, "Records returned: 1")
])
def test_note_field_content(client, data_len, note_expected):
    # Patch yfinance and mapping to return data_len records (simulate multiple dates for >1)
    import pandas as pd
    if data_len == 0:
        mock_df = pd.DataFrame()
        sector_map = {}
        name_map = {}
    else:
        idx = pd.to_datetime(['2024-04-01', '2024-04-02'][:data_len])
        columns = pd.MultiIndex.from_product([
            ['HDFCBANK'],
            ['Open', 'High', 'Low', 'Close', 'Volume']
        ])
        data = [
            [1580.0, 1600.5, 1575.0, 1600.5, 100000],
            [1585.0, 1610.5, 1580.0, 1610.5, 110000]
        ][:data_len]
        mock_df = pd.DataFrame(data, index=idx, columns=columns)
        sector_map = {"HDFCBANK": "FINANCE"}
        name_map = {"HDFCBANK": "HDFC Bank"}
    def mock_download(*a, **k): return mock_df
    def mock_sector(): return sector_map
    def mock_name(): return name_map
    with patch('yfinance.download', side_effect=mock_download), \
         patch('app.routes.get_sector_mapping', side_effect=mock_sector), \
         patch('app.routes.get_name_mapping', side_effect=mock_name):
        params = "index=NIFTY50&sector=FINANCE"
        resp = client.get(f"/api/heatmap-data?{params}")
        assert resp.status_code == 200
        data = resp.get_json()
        if data["note"] != note_expected:
            print("DEBUG: API response data:", data)
        assert data["note"] == note_expected

def test_logging_requests_and_errors(tmp_path, capsys):
    """Test that requests and errors are logged with timestamp and params."""
    import logging
    import importlib
    log_file = tmp_path / "test_api.log"
    os.environ['NSEVIZ_LOG_FILE'] = str(log_file)
    # Reload app.__init__ so logging config is picked up
    import app.__init__ as app_init
    importlib.reload(app_init)
    app = app_init.create_app()
    client = app.test_client()
    root_logger = logging.getLogger()
    print('ROOT LOGGER HANDLERS before requests:', root_logger.handlers)
    # Now run tests as before
    # Successful request
    resp = client.get('/api/heatmap-data?index=NIFTY50&sector=FINANCE')
    assert resp.status_code == 200
    print('ROOT LOGGER HANDLERS after successful request:', root_logger.handlers)
    with open(log_file) as f:
        log_contents = f.read()
    print('LOG FILE CONTENTS after successful request:', log_contents)
    assert 'Request:' in log_contents and '/api/heatmap-data' in log_contents and "'index': 'NIFTY50'" in log_contents, \
        f"Request log entry missing in log file. log_contents={log_contents}"
    # Error request (invalid param)
    resp = client.get('/api/heatmap-data?sector=FINANCE')
    assert resp.status_code == 400
    print('ROOT LOGGER HANDLERS after error request:', root_logger.handlers)
    with open(log_file) as f:
        log_contents = f.read()
    print('LOG FILE CONTENTS after error request:', log_contents)
    assert 'Missing required parameter: index' in log_contents, "Error log entry missing for invalid param in log file."
    # Internal error (simulate yfinance failure)
    from unittest.mock import patch
    with patch('yfinance.download', side_effect=Exception('yfinance failed')):
        resp = client.get('/api/heatmap-data?index=NIFTY50&sector=FINANCE')
        assert resp.status_code == 500
        print('ROOT LOGGER HANDLERS after internal error:', root_logger.handlers)
        with open(log_file) as f:
            log_contents = f.read()
        print('LOG FILE CONTENTS after internal error:', log_contents)
        assert 'yfinance error: yfinance failed' in log_contents, "Internal error log entry missing for yfinance failure in log file."
    # Optionally, check print diagnostics with capsys
    captured = capsys.readouterr()
    assert 'LOGGER DIAG:' in captured.out, "Logger diagnostic print not seen in captured output."
    # Flush and close all handlers
    for handler in root_logger.handlers:
        handler.flush()
        if hasattr(handler, 'close'):
            handler.close()
    # Clean up
    del os.environ['NSEVIZ_LOG_FILE']
