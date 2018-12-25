from flask import Blueprint, jsonify


exercises_blueprint = Blueprint('exercises', __name__)


@exercises_blueprint.route('/exercises/ping', methods=['GET'])
def ping_pong():
    return jsonify({
        'status': 'success',
        'message': 'pong!'
    })
