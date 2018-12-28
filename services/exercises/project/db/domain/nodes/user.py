from project.db.domain.entity import Entity
from project.db.domain import date_fmt_str
from datetime import datetime
from typing import Dict, Union


class User(Entity):
    """
    Python representation of a User model.

    `user_id`: ID from the `users` service
    """

    user_id: int = None
    created_at: datetime = None
    updated_at: datetime = None

    def __init__(self, id: int, user_id: int, created_at: datetime, updated_at: datetime):
        Entity.__init__(self, id)
        self.user_id = user_id
        self.created_at = datetime.strptime(created_at, date_fmt_str)
        self.updated_at = datetime.strptime(updated_at, date_fmt_str)

    def serialize(self):
        """Serialize a `User` object into a `dict`"""
        return {
            'user_id': self.user_id,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }

    def deserialize(**kwargs):
        """Deserialize a `dict` into a `User`"""
        return User(kwargs['id'], kwargs['user_id'], kwargs['created_at'], kwargs['updated_at'])
