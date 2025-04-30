"""
Module-level docstring:
Initializes the Flask application, configures logging, CORS, and registers blueprints.
"""
import os
import logging

from flask import Flask
from flask_cors import CORS
from typing import Any


def create_app() -> Flask:
    """
    Factory function to create and configure the Flask application.
    Sets up CORS, logging, and registers API blueprints.
    Returns:
        Flask: The configured Flask application instance.
    """
    app = Flask(__name__)
    CORS(app)
    
    # Set up root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)
    
    # Clear existing handlers to avoid duplicates
    for handler in list(root_logger.handlers):
        root_logger.removeHandler(handler)
    
    # Set up app.logger
    app.logger.setLevel(logging.INFO)
    for handler in list(app.logger.handlers):
        app.logger.removeHandler(handler)
    
    # Common formatter
    formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
    
    # Add FileHandler if NSEVIZ_LOG_FILE env var is set
    log_file = os.environ.get('NSEVIZ_LOG_FILE')
    if log_file:
        file_handler = logging.FileHandler(log_file, mode='a')
        file_handler.setFormatter(formatter)
        file_handler.setLevel(logging.INFO)
        root_logger.addHandler(file_handler)
        
        # Also add to app.logger for Flask internal logs
        app_file_handler = logging.FileHandler(log_file, mode='a')
        app_file_handler.setFormatter(formatter)
        app_file_handler.setLevel(logging.INFO)
        app.logger.addHandler(app_file_handler)
    
    # Add console handler
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    console_handler.setLevel(logging.INFO)
    root_logger.addHandler(console_handler)
    
    # Ensure app.logger also has console handler
    app_console_handler = logging.StreamHandler()
    app_console_handler.setFormatter(formatter)
    app_console_handler.setLevel(logging.INFO)
    app.logger.addHandler(app_console_handler)
    
    # Disable Flask's default handlers
    app.logger.propagate = False
    
    # Import and register blueprints
    from .routes import api_bp
    app.register_blueprint(api_bp)

    # App-level error handler for 500 errors: returns JSON for /api/*
    @app.errorhandler(500)
    def handle_internal_error(e: Exception) -> Any:
        """
        Handle uncaught internal server errors at the app level.
        Returns JSON for API routes and plain text for others.
        Args:
            e (Exception): The exception that was raised.
        Returns:
            Response: JSON or plain text response with error details and HTTP 500 status.
        """
        from flask import request, jsonify, current_app
        current_app.logger.error(f"Error: Internal error: {e}")
        if request.path.startswith('/api/'):
            return jsonify(error={"code": "INTERNAL_ERROR", "message": "Server error"}), 500
        # For non-API routes, use default error page
        return str(e), 500

    return app
