import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app import create_app

def test_cors_headers_on_heatmap_data():
    app = create_app()
    app.testing = True
    client = app.test_client()
    origin = 'http://localhost'
    response = client.options(
        '/api/heatmap-data',
        headers={
            'Origin': origin,
            'Access-Control-Request-Method': 'GET'
        }
    )
    assert response.status_code == 200
    assert 'Access-Control-Allow-Origin' in response.headers
    # Accept either the request Origin or '*'
    assert response.headers['Access-Control-Allow-Origin'] in (origin, '*')