import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app import create_app

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
