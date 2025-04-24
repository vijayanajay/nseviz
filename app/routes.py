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
    # Validate query params
    index = request.args.get('index')
    sector = request.args.get('sector')
    date_str = request.args.get('date')
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
    # Date param validation and yfinance download args
    yf_kwargs = {}
    if date_str:
        from datetime import datetime, timedelta
        try:
            date_obj = datetime.strptime(date_str, "%Y-%m-%d")
            # yfinance end date is exclusive, so add 1 day
            next_day = date_obj + timedelta(days=1)
            yf_kwargs['start'] = date_obj.strftime("%Y-%m-%d")
            yf_kwargs['end'] = next_day.strftime("%Y-%m-%d")
        except ValueError:
            return jsonify(error={"code": "INVALID_PARAM", "message": "Invalid date format for 'date' param, expected YYYY-MM-DD"}), 400
    else:
        yf_kwargs['period'] = '1d'
    try:
        tickers = valid_indices[index]
        df = yf.download(tickers, group_by='ticker', **yf_kwargs)
        sector_map = get_sector_mapping()
        name_map = get_name_mapping()
        result = []
        for symbol in tickers:
            if sector_map.get(symbol) != sector:
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
        response = {
            "index": index,
            "sector": sector,
            "data": result
        }
        return jsonify(response)
    except Exception as e:
        current_app.logger.error(f"yfinance error: {e}")
        return jsonify(error={"code": "YFINANCE_ERROR", "message": str(e)}), 500