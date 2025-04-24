"""
Automated API contract tests for /api/heatmap-data endpoint using pytest + requests.
Requires the Flask server to be running at http://localhost:5000.
Run with: pytest tests/test_api_contract_requests.py
"""
import pytest
import requests

BASE_URL = "http://localhost:5000/api/heatmap-data"

def validate_success_response(data):
    assert isinstance(data, dict)
    for key in ["index", "data", "date", "note"]:
        assert key in data, f"Missing key: {key}"
    assert isinstance(data["index"], str)
    if "sector" in data:
        assert isinstance(data["sector"], (str, type(None)))
    assert isinstance(data["date"], str)
    assert isinstance(data["data"], list)
    assert isinstance(data["note"], str)
    for item in data["data"]:
        for field in ["symbol", "name", "price", "change", "volume"]:
            assert field in item, f"Missing field: {field}"
        assert isinstance(item["symbol"], str)
        assert isinstance(item["name"], str)
        assert isinstance(item["price"], float)
        assert isinstance(item["change"], float)
        assert isinstance(item["volume"], int)

def validate_error_response(data):
    assert isinstance(data, dict)
    assert "error" in data, "Missing 'error' key"
    error = data["error"]
    assert isinstance(error, dict)
    assert "code" in error and "message" in error
    assert isinstance(error["code"], str)
    assert isinstance(error["message"], str)

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
def test_api_contract_combinations(params, expected_status, expect_success):
    url = BASE_URL
    if params:
        url += f"?{params}"
    resp = requests.get(url)
    assert resp.status_code == expected_status
    data = resp.json()
    if expect_success:
        validate_success_response(data)
    else:
        validate_error_response(data)

@pytest.mark.parametrize("category", [None, "ALL", "LARGE_CAP", "MID_CAP"])
@pytest.mark.parametrize("sector", [None, "FINANCE", "IT"])
@pytest.mark.parametrize("date", [None, "2024-04-01"])
def test_api_contract_matrix(category, sector, date):
    params = {"index": "NIFTY50"}
    if category: params["category"] = category
    if sector: params["sector"] = sector
    if date: params["date"] = date
    url = BASE_URL + "?" + "&".join(f"{k}={v}" for k, v in params.items())
    resp = requests.get(url)
    assert resp.status_code == 200
    data = resp.json()
    validate_success_response(data)

@pytest.mark.parametrize("date", ["notadate", "01-04-2024", "20240401"])
def test_api_contract_invalid_date_formats(date):
    url = f"{BASE_URL}?index=NIFTY50&date={date}"
    resp = requests.get(url)
    assert resp.status_code == 400
    data = resp.json()
    validate_error_response(data)
    assert data["error"]["code"] == "INVALID_PARAM"
    assert "date" in data["error"]["message"]

def test_api_contract_missing_all_params():
    resp = requests.get(BASE_URL)
    assert resp.status_code == 400
    data = resp.json()
    validate_error_response(data)
    assert data["error"]["code"] == "INVALID_PARAM"
    assert "index" in data["error"]["message"]

def test_invalid_sector_param():
    resp = requests.get(f'{BASE_URL}?index=NIFTY50&sector=INVALID')
    assert resp.status_code == 200
    data = resp.json()
    assert data["data"] == []
    assert "note" in data
    assert data["note"] == "No data available for the given parameters."

def test_invalid_category_param():
    resp = requests.get(f'{BASE_URL}?index=NIFTY50&category=INVALID')
    assert resp.status_code == 200
    data = resp.json()
    assert data["data"] == []
    assert "note" in data
    assert data["note"] == "No data available for the given parameters."
