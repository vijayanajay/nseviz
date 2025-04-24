# NSEViz API Contract

## Endpoint

**GET** `/api/heatmap-data`

---

## Query Parameters

| Name      | Type   | Required | Description                                                    | Example        |
|-----------|--------|----------|----------------------------------------------------------------|----------------|
| category  | string | No       | Category of stocks (e.g., "ALL", "LARGE_CAP", "MID_CAP")    | ALL            |
| index     | string | Yes      | Index name (e.g., "NIFTY50", "NIFTYBANK")                   | NIFTY50        |
| sector    | string | No       | NSE sector name (e.g., "FINANCE", "IT")                      | FINANCE        |
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
  ]
}
```

---

## Example Error Responses

**Invalid Parameter:**
```json
{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid sector specified."
  }
}
```

**Internal Server Error:**
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred."
  }
}
```

---

## Notes
- All responses are JSON.
- All errors follow the structured error format above.
- Only GET requests are supported.
- For more details, see the backend implementation and tests.
