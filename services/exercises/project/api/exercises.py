from flask import Blueprint, jsonify


exercises_blueprint = Blueprint('exercises', __name__)


@exercises_blueprint.route('/exercises/ping', methods=['GET'])
def ping_pong():
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
