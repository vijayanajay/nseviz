from flask import Blueprint, jsonify, request, current_app
from flask_cors import CORS

api_bp = Blueprint('api', __name__)
CORS(api_bp)  # Explicitly enable CORS on the blueprint

# --- Error Handlers ---
@api_bp.errorhandler(500)
def handle_internal_error(e):
    current_app.logger.error(f"Internal error: {e}")
    return jsonify(error={"code": "INTERNAL_ERROR", "message": "Server error"}), 500

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
    valid_indices = {"NIFTY50", "NIFTYBANK"}  # Example, extend as needed
    valid_sectors = {"FINANCE", "IT", "AUTO"}  # Example, extend as needed
    if not index:
        return jsonify(error={"code": "INVALID_PARAM", "message": "Missing required parameter: index"}), 400
    if index not in valid_indices:
        return jsonify(error={"code": "INVALID_PARAM", "message": f"Invalid index: {index}"}), 400
    if not sector:
        return jsonify(error={"code": "INVALID_PARAM", "message": "Missing required parameter: sector"}), 400
    if sector not in valid_sectors:
        return jsonify(error={"code": "INVALID_PARAM", "message": f"Invalid sector: {sector}"}), 400
    # Mock data as per API contract
    mock_response = {
        "index": index,
        "sector": sector,
        "data": [
            {"symbol": "HDFCBANK", "change": 1.2, "price": 1600.5}
        ]
    }
    return jsonify(mock_response)