from flask import Blueprint, jsonify, request, current_app
from flask_cors import CORS
import yfinance as yf
from datetime import datetime

api_bp = Blueprint('api', __name__)
CORS(api_bp)  # Explicitly enable CORS on the blueprint

# --- Error Handlers ---
@api_bp.errorhandler(500)
def handle_internal_error(e):
    current_app.logger.error(f"Internal error: {e}")
    return jsonify(error={"code": "INTERNAL_ERROR", "message": "Server error"}), 500

# --- Sector mapping helper ---
def get_sector_mapping():
    # In production, this would be dynamic or from a DB/file. For now, static for TDD/testing.
    return {
        "HDFCBANK": "FINANCE",
        "INFY": "IT",
        # Add more mappings as needed
    }

# --- Name mapping helper ---
def get_name_mapping():
    # Static mapping for TDD/testing. In production, fetch from a DB or yfinance.Ticker().info
    return {
        "HDFCBANK": "HDFC Bank",
        "INFY": "Infosys Ltd",
        # Add more mappings as needed
    }

# --- Endpoint ---
@api_bp.route('/api/heatmap-data', methods=['GET', 'OPTIONS'])
def heatmap_data():
    # For CORS preflight OPTIONS requests, return 200
    if request.method == 'OPTIONS':
        return '', 200
    try:
        # Validate required params
        index = request.args.get("index")
        if not index:
            return jsonify(error={"code": "INVALID_PARAM", "message": "Missing required parameter: index"}), 400
        sector = request.args.get("sector")
        category = request.args.get("category")
        date = request.args.get("date")
        # Default date to today if not provided
        if not date:
            date = datetime.now().strftime("%Y-%m-%d")
        else:
            try:
                # Validate date format
                datetime.strptime(date, "%Y-%m-%d")
            except ValueError:
                return jsonify(error={"code": "INVALID_PARAM", "message": f"Invalid date format: {date}"}), 400
        # Validate sector/category only if provided (do not reject unknown sector/category, just return empty)
        valid_indices = {"NIFTY50": ["HDFCBANK", "INFY"], "NIFTYBANK": ["HDFCBANK"]}  # Example mapping
        valid_sectors = {"FINANCE", "IT", "AUTO"}  # Example, extend as needed
        if index not in valid_indices:
            return jsonify(error={"code": "INVALID_PARAM", "message": f"Invalid index: {index}"}), 400
        # Fetch data (mocked or real)
        tickers = valid_indices[index]
        yf_kwargs = {}
        yf_kwargs['start'] = date
        yf_kwargs['end'] = date
        df = yf.download(tickers, group_by='ticker', **yf_kwargs)
        sector_map = get_sector_mapping()
        name_map = get_name_mapping()
        result = []
        for symbol in tickers:
            if sector and sector_map.get(symbol) != sector:
                continue
            # Handle both single and multi-index DataFrame
            stock_df = df[symbol] if symbol in df else df
            if stock_df.empty:
                continue
            latest = stock_df.iloc[-1]
            price = float(latest['Close'])
            change = float(latest['Close'] - latest['Open']) / float(latest['Open']) * 100 if latest['Open'] else 0
            volume = int(latest['Volume']) if 'Volume' in latest else 0
            name = name_map.get(symbol, symbol)
            result.append({
                "symbol": symbol,
                "name": name,
                "price": price,
                "change": round(change, 2),
                "volume": volume
            })
        # Always include date in response
        response = {
            "index": index,
            "sector": sector,
            "date": date,
            "data": result
        }
        # Add note/message for clarity
        if not result:
            response["note"] = "No data available for the given parameters."
        else:
            response["note"] = f"Records returned: {len(result)}"
        return jsonify(response), 200
    except Exception as e:
        current_app.logger.error(f"yfinance error: {e}")
        return jsonify(error={"code": "YFINANCE_ERROR", "message": str(e)}), 500