import os

from flask import Flask, g
from flask_cors import CORS

from py2neo import Graph


password = os.getenv('DATABASE_PASSWORD', '')

driver = Graph(
    auth=('neo4j', password),
    host='exercises-db',
    port=7687,
    scheme='bolt'
)


def get_db() -> Graph:
    if not hasattr(g, 'neo4j_db'):
        g.neo4j_db = driver  # TODO: not able to find docs on sessions with py2neo
    return g.neo4j_db


def create_app(script_info=None):

    # instantiate the app
    app = Flask(__name__)

    # Enable CORS
    CORS(app)

    # set config
    app_settings = os.getenv('APP_SETTINGS')
    app.config.from_object(app_settings)

    # register blueprints
    from project.api.exercises import exercises_blueprint
    from project.api.textbooks import textbooks_blueprint
    app.register_blueprint(textbooks_blueprint)
    app.register_blueprint(exercises_blueprint)

    # shell context for flask cli
    app.shell_context_processor({'app': app, 'db': driver})
    return app
