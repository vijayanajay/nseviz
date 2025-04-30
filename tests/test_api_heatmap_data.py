"""
Contract tests for /api/heatmap-data endpoint (TDD, NSEViz)
Covers: success, filtering, errors, and edge cases.
"""
import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_success_minimal(client):
    resp = client.get('/api/heatmap-data?index=NIFTY50')
    assert resp.status_code == 200
    data = resp.get_json()
    
    # Check basic structure of response
    assert isinstance(data, dict)
    assert 'data' in data
    assert isinstance(data['data'], list)
    
    # If there's data returned, verify schema of the first item
    if data['data']:
        first_item = data['data'][0]
        assert 'symbol' in first_item
        assert 'name' in first_item
        assert isinstance(first_item['symbol'], str)
        assert isinstance(first_item['name'], str)
    else:
        # If no data, make sure there's a note explaining why
        assert 'note' in data
        assert "No data available" in data['note']

def test_sector_filter(client):
    resp = client.get('/api/heatmap-data?index=NIFTY50&sector=FINANCE')
    assert resp.status_code == 200
    data = resp.get_json()
    
    # Verify the structure of the response
    assert 'data' in data
    assert isinstance(data['data'], list)
    
    # Check if there's data, then verify all items have the same sector
    if data['data']:
        for item in data['data']:
            assert 'sector' in item
            assert item['sector'] == 'FINANCE'
    else:
        # If no data, make sure there's a note explaining why
        assert 'note' in data
        assert "No data available" in data['note']

def test_date_filter(client):
    resp = client.get('/api/heatmap-data?index=NIFTY50&date=2022-01-01')
    assert resp.status_code == 200
    data = resp.get_json()
    assert 'data' in data

@pytest.mark.parametrize('param,value', [
    ('index', ''),
    ('index', 'UNKNOWNINDEX'),
    ('date', 'not-a-date'),
])
def test_invalid_params(client, param, value):
    url = f'/api/heatmap-data?index=NIFTY50'
    if param == 'index':
        url = f'/api/heatmap-data?index={value}'
    elif param == 'date':
        url = f'/api/heatmap-data?index=NIFTY50&date={value}'
    resp = client.get(url)
    assert resp.status_code in (400, 404)
    data = resp.get_json()
    assert 'error' in data
    assert 'code' in data['error']
    assert 'message' in data['error']

def test_future_date(client):
    resp = client.get('/api/heatmap-data?index=NIFTY50&date=2100-01-01')
    assert resp.status_code == 200
    data = resp.get_json()
    assert isinstance(data['data'], list)

def test_empty_data(client):
    resp = client.get('/api/heatmap-data?index=EMPTYINDEX')
    assert resp.status_code in (200, 400, 404)
    data = resp.get_json()
    if resp.status_code == 200:
        assert data['data'] == []
    else:
        assert 'error' in data
