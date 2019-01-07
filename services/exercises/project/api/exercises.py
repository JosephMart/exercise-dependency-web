from flask import Blueprint, jsonify, current_app as app

from project.models import Textbook
from project import get_db


exercises_blueprint = Blueprint('exercises', __name__)


@exercises_blueprint.route('/exercises/ping', methods=['GET'])
def ping_pong():
    db = get_db()
    t = Textbook.match(db)
    app.logger.info(list(t)[0].title)

    return jsonify({
        'status': 'success',
        'message': 'pong!'
    })


@exercises_blueprint.route('/exercises', methods=['GET'])
def get_exercises():
    """Get exercises, filter with query string..."""
    return jsonify({
        'status': 'success',
        'message': 'pong!'
    })


@exercises_blueprint.route('/exercises', methods=['POST'])
def add_exercises():
    """Ingest exercises"""
    return jsonify({
        'status': 'success',
        'message': 'pong!'
    })
