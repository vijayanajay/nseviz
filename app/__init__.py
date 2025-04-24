import os
import logging

from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)
    # Structured logging config
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
    app.logger.setLevel(logging.INFO)
    # Add FileHandler if NSEVIZ_LOG_FILE env var is set (for testing)
    log_file = os.environ.get('NSEVIZ_LOG_FILE')
    if log_file:
        file_handler = logging.FileHandler(log_file, mode='a')
        file_handler.setFormatter(formatter)
        logging.getLogger().addHandler(file_handler)
        app.logger.addHandler(file_handler)
    # Add StreamHandler for console logs in dev
    if not app.logger.handlers:
        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(formatter)
        app.logger.addHandler(stream_handler)
    # Import and register blueprints
    from .routes import api_bp
    app.register_blueprint(api_bp)

    # App-level error handler for 500 errors: returns JSON for /api/*
    @app.errorhandler(500)
    def handle_internal_error(e):
        from flask import request, jsonify, current_app
        current_app.logger.error(f"Error: Internal error: {e}")
        if request.path.startswith('/api/'):
            return jsonify(error={"code": "INTERNAL_ERROR", "message": "Server error"}), 500
        # For non-API routes, use default error page
        return str(e), 500

    return app
