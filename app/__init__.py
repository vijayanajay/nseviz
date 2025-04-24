from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    # Register blueprints
    from .routes import api_bp
    app.register_blueprint(api_bp)

    # App-level error handler for 500 errors: returns JSON for /api/*
    @app.errorhandler(500)
    def handle_internal_error(e):
        from flask import request, jsonify, current_app
        current_app.logger.error(f"Internal error: {e}")
        if request.path.startswith('/api/'):
            return jsonify(error={"code": "INTERNAL_ERROR", "message": "Server error"}), 500
        # For non-API routes, use default error page
        return str(e), 500

    return app
