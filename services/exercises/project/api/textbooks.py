from flask import Blueprint, jsonify, request
from project.repositories.textbook import TextbookRepository


textbooks_blueprint = Blueprint('textbook', __name__)


@textbooks_blueprint.route('/textbooks', methods=['GET'])
def get_textbooks():
    user_id = None
    try:
        user_id = int(request.args.get('user_id'))
    except ValueError:
        return jsonify({
            'status': 'error',
            'message': 'user_id must be an integer'
        })

    if user_id == None:
        return jsonify({
            'status': 'error',
            'message': 'user_id is a required parameter'
        })
    textbooks = TextbookRepository.find_textbooks_by_user(user_id)
    return jsonify({
        'textbooks': [x.serialize() for x in textbooks]
    })