from flask import Blueprint, jsonify, request, current_app
from flask_cors import CORS
import yfinance as yf
from datetime import datetime
import logging
import os

api_bp = Blueprint('api', __name__)
CORS(api_bp)  # Explicitly enable CORS on the blueprint

# --- Error Handlers ---
@api_bp.errorhandler(500)
def handle_internal_error(e):
    logger = logging.getLogger()
    logger.error(f"Internal error: {e}")
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
    logger = logging.getLogger()
    # For CORS preflight OPTIONS requests, return 200
    if request.method == 'OPTIONS':
        return '', 200
    try:
        # Attach file handler directly if env var is set (for test robustness)
        log_file = os.environ.get('NSEVIZ_LOG_FILE')
        if log_file:
            # Remove any existing FileHandlers for this log file to avoid duplicates
            handlers_to_remove = []
            for h in logger.handlers:
                if isinstance(h, logging.FileHandler) and getattr(h, 'baseFilename', None) == log_file:
                    handlers_to_remove.append(h)
            for h in handlers_to_remove:
                logger.removeHandler(h)
                h.close()
            fh = logging.FileHandler(log_file, mode='a')
            fh.setLevel(logging.INFO)
            fh.setFormatter(logging.Formatter('%(asctime)s %(levelname)s %(message)s'))
            logger.addHandler(fh)
            logger.setLevel(logging.INFO)
            print(f'LOGGER HANDLERS in endpoint: {logger.handlers}')
        # Debug log the logger name and handlers for diagnosis
        logger.debug(f"Logger name in use: {logger.name}")
        logger.debug(f"Logger handlers: {logger.handlers}")
        print(f'LOGGER DIAG: name={logger.name}, handlers={logger.handlers}')
        # Log every request with timestamp and params
        logger.info(f"Request: {request.method} {request.path} params={dict(request.args)}")
        logger.error(f"[DIAG] After INFO log: logger.level={logger.level}, effective={logger.getEffectiveLevel()}, handlers=[{', '.join(str((type(h), getattr(h, 'baseFilename', None), h.level)) for h in logger.handlers)}]")
        print(f'[DIAG] After INFO log: logger.level={logger.level}, effective={logger.getEffectiveLevel()}, handlers=[{", ".join(str((type(h), getattr(h, "baseFilename", None), h.level)) for h in logger.handlers)}]')
        # Flush all handlers to ensure log is written
        for h in logger.handlers:
            if hasattr(h, 'flush'):
                h.flush()
        # Direct root logger log
        import logging as pylogging
        pylogging.info(f"[DIRECT] Request: {request.method} {request.path} params={dict(request.args)}")
        # Check for repeated critical query parameters
        critical_params = ["index", "sector", "category", "date"]
        for param in critical_params:
            if len(request.args.getlist(param)) > 1:
                logger.error(f"Repeated query parameter: {param}")
                return jsonify(error={"code": "INVALID_PARAM", "message": f"Repeated query parameter: {param}"}), 400
        # Validate required params
        index = request.args.get("index")
        if not index:
            logger.error("Missing required parameter: index")
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
                logger.error(f"Invalid date format: {date}")
                return jsonify(error={"code": "INVALID_PARAM", "message": f"Invalid date format: {date}"}), 400
        # Validate sector/category only if provided (do not reject unknown sector/category, just return empty)
        valid_indices = {"NIFTY50": ["HDFCBANK", "INFY"], "NIFTYBANK": ["HDFCBANK"]}  # Example mapping
        valid_sectors = {"FINANCE", "IT", "AUTO"}  # Example, extend as needed
        if index not in valid_indices:
            logger.error(f"Invalid index: {index}")
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
        logger.error(f"yfinance error: {e}")
        return jsonify(error={"code": "YFINANCE_ERROR", "message": str(e)}), 500