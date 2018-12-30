import os

from flask import Flask, g
from flask_cors import CORS
from neo4j import GraphDatabase, basic_auth, Session


password = os.getenv('DATABASE_PASSWORD')

driver = GraphDatabase.driver(
    'bolt://exercises-db', auth=basic_auth('neo4j', password))


def get_db() -> Session:
    if not hasattr(g, 'neo4j_db'):
        g.neo4j_db = driver.session()
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
    app.register_blueprint(exercises_blueprint)

    # shell context for flask cli
    app.shell_context_processor({'app': app, 'db': driver.session()})
    return app
