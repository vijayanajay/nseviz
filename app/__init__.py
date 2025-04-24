from flask import Flask

def create_app():
    app = Flask(__name__)
    # Import routes to register them
    from . import routes
    return app
