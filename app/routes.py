from flask import Blueprint, jsonify, request
from flask_cors import CORS

api_bp = Blueprint('api', __name__)
CORS(api_bp)  # Explicitly enable CORS on the blueprint

@api_bp.route('/api/heatmap-data', methods=['GET', 'OPTIONS'])
def heatmap_data():
    # Mock data as per API contract
    mock_response = {
        "index": "NIFTY50",
        "sector": "FINANCE",
        "data": [
            {"symbol": "HDFCBANK", "change": 1.2, "price": 1600.5}
        ]
    }
    return jsonify(mock_response)