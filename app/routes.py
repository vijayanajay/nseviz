from flask import Blueprint, jsonify, request, current_app
from flask_cors import CORS
import yfinance as yf

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

# --- Endpoint ---
@api_bp.route('/api/heatmap-data', methods=['GET', 'OPTIONS'])
def heatmap_data():
    # For CORS preflight OPTIONS requests, return 200
    if request.method == 'OPTIONS':
        return '', 200
    # Validate query params
    index = request.args.get('index')
    sector = request.args.get('sector')
    # For test: force a server error if force_error=1
    if request.args.get('force_error') == '1':
        raise Exception('Forced server error for testing')
    valid_indices = {"NIFTY50": ["HDFCBANK", "INFY"], "NIFTYBANK": ["HDFCBANK"]}  # Example mapping
    valid_sectors = {"FINANCE", "IT", "AUTO"}  # Example, extend as needed
    if not index:
        return jsonify(error={"code": "INVALID_PARAM", "message": "Missing required parameter: index"}), 400
    if index not in valid_indices:
        return jsonify(error={"code": "INVALID_PARAM", "message": f"Invalid index: {index}"}), 400
    if not sector:
        return jsonify(error={"code": "INVALID_PARAM", "message": "Missing required parameter: sector"}), 400
    if sector not in valid_sectors:
        return jsonify(error={"code": "INVALID_PARAM", "message": f"Invalid sector: {sector}"}), 400
    try:
        tickers = valid_indices[index]
        df = yf.download(tickers, period='1d', group_by='ticker')
        sector_map = get_sector_mapping()
        result = []
        for symbol in tickers:
            if sector_map.get(symbol) != sector:
                continue
            # Handle both single and multi-index DataFrame
            stock_df = df[symbol] if symbol in df else df
            latest = stock_df.iloc[-1]
            price = float(latest['Close'])
            change = float(latest['Close'] - latest['Open']) / float(latest['Open']) * 100 if latest['Open'] else 0
            result.append({
                "symbol": symbol,
                "price": price,
                "change": round(change, 2)
            })
        response = {
            "index": index,
            "sector": sector,
            "data": result
        }
        return jsonify(response)
    except Exception as e:
        current_app.logger.error(f"yfinance error: {e}")
        return jsonify(error={"code": "YFINANCE_ERROR", "message": str(e)}), 500