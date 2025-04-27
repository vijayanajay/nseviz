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
    assert isinstance(data, dict)
    assert 'data' in data
    assert isinstance(data['data'], list)
    assert all('symbol' in item and 'name' in item for item in data['data'])

def test_sector_filter(client):
    resp = client.get('/api/heatmap-data?index=NIFTY50&sector=FINANCE')
    assert resp.status_code == 200
    data = resp.get_json()
    assert all(item['sector'] == 'FINANCE' for item in data['data'])

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
