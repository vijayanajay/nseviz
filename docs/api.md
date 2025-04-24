# NSEViz API Contract

## Endpoint

**GET** `/api/heatmap-data`

---

## Query Parameters

| Name      | Type   | Required | Description                                                    | Example        |
|-----------|--------|----------|----------------------------------------------------------------|----------------|
| category  | string | No       | Category for filtering (e.g., "ALL", "LARGE_CAP", "MID_CAP"). Unknown values do not error, just return empty data. | ALL            |
| index     | string | Yes      | Index name (e.g., "NIFTY50", "NIFTYBANK")                   | NIFTY50        |
| sector    | string | No       | NSE sector name (e.g., "FINANCE", "IT"). Unknown values do not error, just return empty data. | FINANCE        |
| date      | string | No       | Date for data (YYYY-MM-DD). Defaults to latest if not present. | 2024-04-01     |

---

## Example Request

```
GET /api/heatmap-data?index=NIFTY50&sector=FINANCE&date=2024-04-01
```

---

## Example Successful Response

```json
{
  "index": "NIFTY50",
  "sector": "FINANCE",
  "date": "2024-04-01",
  "data": [
    {
      "symbol": "HDFCBANK",
      "name": "HDFC Bank",
      "price": 1600.5,
      "change": 1.2,
      "volume": 1234567
    },
    {
      "symbol": "ICICIBANK",
      "name": "ICICI Bank",
      "price": 900.0,
      "change": -0.8,
      "volume": 7654321
    }
  ],
  "note": "Records returned: 2"
}
```

## Example Successful Response (No Data)

```json
{
  "index": "NIFTY50",
  "sector": "FINANCE",
  "date": "2024-04-02",
  "data": [],
  "note": "No data available for the given parameters."
}
```

---

## Example Error Responses

**Invalid Parameter:**
```json
{
  "error": {
    "code": "INVALID_PARAM",
    "message": "Invalid sector: FOOBAR"
  }
}
```

**Missing Parameter:**
```json
{
  "error": {
    "code": "INVALID_PARAM",
    "message": "Missing required parameter: index"
  }
}
```

**Repeated Parameter:**
```json
{
  "error": {
    "code": "INVALID_PARAM",
    "message": "Repeated query parameter: sector"
  }
}
```

**Invalid Date Format:**
```json
{
  "error": {
    "code": "INVALID_PARAM",
    "message": "Invalid date format: 2024-13-01"
  }
}
```

**Invalid Index:**
```json
{
  "error": {
    "code": "INVALID_PARAM",
    "message": "Invalid index: FOOBAR"
  }
}
```

**yfinance Error:**
```json
{
  "error": {
    "code": "YFINANCE_ERROR",
    "message": "<error details>"
  }
}
```

**Internal Server Error:**
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Server error"
  }
}
```

---

## Notes
- Only GET and OPTIONS requests are supported (OPTIONS is for CORS preflight; returns 200 with no body).
- Unknown sector or category values do not cause errors; the response will have an empty data array and a note.
- Error codes: INVALID_PARAM (for missing/invalid/repeated params), YFINANCE_ERROR (for data fetch issues), INTERNAL_ERROR (for uncaught server errors).
- All responses are JSON.
- All errors follow the structured error format above.
- The `note` field is always present in successful responses. It provides a human-readable summary of the data result for debugging and UI.
- For more details, see the backend implementation and tests.
