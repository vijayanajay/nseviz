from flask import Blueprint, jsonify, request, current_app
from flask_cors import CORS
import yfinance as yf
from datetime import datetime
import logging
import os
from typing import Dict, Any, List, Optional
import numpy as np

"""
Module-level docstring:
This module defines the API routes for the application.
It includes error handlers, helper functions, and the main endpoint for fetching heatmap data.
"""

api_bp = Blueprint('api', __name__)
CORS(api_bp)  # Explicitly enable CORS on the blueprint

# --- Error Handlers ---
@api_bp.errorhandler(500)
def handle_internal_error(e: Exception) -> Any:
    """
    Handle internal server errors and return a structured JSON response.
    Args:
        e (Exception): The exception that was raised.
    Returns:
        Response: Flask JSON response with error details and HTTP 500 status.
    """
    logger = logging.getLogger()
    logger.error(f"Internal error: {e}")
    return jsonify(error={"code": "INTERNAL_ERROR", "message": "Server error"}), 500

# --- Sector mapping helper ---
def get_sector_mapping() -> Dict[str, str]:
    """
    Returns a static mapping of stock symbols to sectors.
    In production, this would be dynamic or loaded from a database or file.
    Returns:
        dict: Mapping of symbol to sector.
    """
    return {
        "HDFCBANK": "FINANCE",
        "INFY": "IT",
        # Add more mappings as needed
    }

# --- Name mapping helper ---
def get_name_mapping() -> Dict[str, str]:
    """
    Returns a static mapping of stock symbols to company names.
    In production, fetch from a DB or yfinance.Ticker().info.
    Returns:
        dict: Mapping of symbol to name.
    """
    return {
        "HDFCBANK": "HDFC Bank",
        "INFY": "Infosys Ltd",
        # Add more mappings as needed
    }

# --- Endpoint ---
@api_bp.route('/api/heatmap-data', methods=['GET', 'OPTIONS'])
def heatmap_data() -> Any:
    """
    API endpoint to fetch heatmap data for a given index, sector, category, and date.
    Query Parameters:
        index (str): Required. Index name (e.g., NIFTY50).
        sector (str): Optional. Sector name (e.g., FINANCE).
        category (str): Optional. Category for filtering.
        date (str): Optional. Date in YYYY-MM-DD format. Defaults to today.
    Returns:
        Response: JSON response with heatmap data or error message.
    """
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
        index: Optional[str] = request.args.get("index")
        if not index:
            logger.error("Missing required parameter: index")
            return jsonify(error={"code": "INVALID_PARAM", "message": "Missing required parameter: index"}), 400
        sector: Optional[str] = request.args.get("sector")
        category: Optional[str] = request.args.get("category")
        date: Optional[str] = request.args.get("date")
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
        valid_indices: Dict[str, List[str]] = {"NIFTY50": ["HDFCBANK", "INFY"], "NIFTYBANK": ["HDFCBANK"]}  # Example mapping
        valid_sectors: set = {"FINANCE", "IT", "AUTO"}  # Example, extend as needed
        if index not in valid_indices:
            logger.error(f"Invalid index: {index}")
            return jsonify(error={"code": "INVALID_PARAM", "message": f"Invalid index: {index}"}), 400
        
        # Fetch data (mocked or real)
        tickers: List[str] = valid_indices[index]
        yf_kwargs: Dict[str, Any] = {}
        yf_kwargs['start'] = date
        yf_kwargs['end'] = date
        
        try:
            df = yf.download(tickers, group_by='ticker', **yf_kwargs)
        except Exception as yf_error:
            logger.error(f"yfinance download error: {yf_error}")
            return jsonify(error={"code": "YFINANCE_ERROR", "message": str(yf_error)}), 500
            
        # Check if dataframe is empty
        if df.empty:
            return jsonify({
                "index": index,
                "sector": sector,
                "date": date,
                "data": [],
                "note": "No data available for the given parameters."
            }), 200
            
        sector_map: Dict[str, str] = get_sector_mapping()
        name_map: Dict[str, str] = get_name_mapping()
        result: List[Dict[str, Any]] = []
        
        for symbol in tickers:
            if sector and sector_map.get(symbol) != sector:
                continue
            try:
                # Handle both single and multi-index DataFrame
                if hasattr(df, 'columns') and hasattr(df.columns, 'levels') and symbol in df.columns.levels[0]:
                    stock_df = df[symbol]
                elif symbol in df.columns:
                    stock_df = df[[col for col in df.columns if col == symbol or (isinstance(col, tuple) and col[0] == symbol)]]
                elif symbol in df:
                    stock_df = df[symbol]
                else:
                    stock_df = df
                if stock_df.empty:
                    continue
                latest = stock_df.iloc[-1]
                if 'Close' not in latest or np.isnan(latest['Close']):
                    continue
                price = float(latest['Close'])
                if 'Open' in latest and not np.isnan(latest['Open']) and latest['Open'] > 0:
                    change = float(latest['Close'] - latest['Open']) / float(latest['Open']) * 100
                else:
                    change = 0.0
                if 'Volume' in latest and not np.isnan(latest['Volume']):
                    volume = int(latest['Volume'])
                else:
                    volume = 0
                name = name_map.get(symbol, symbol)
                result.append({
                    "symbol": symbol,
                    "name": name,
                    "price": price,
                    "change": round(change, 2),
                    "volume": volume,
                    "sector": sector_map.get(symbol, "UNKNOWN")
                })
            except Exception as symbol_error:
                logger.error(f"Error processing symbol {symbol}: {symbol_error}")
                continue
                
        # Always include date in response
        response: Dict[str, Any] = {
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