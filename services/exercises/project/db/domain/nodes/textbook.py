from project.db.domain.entity import Entity
from project.db.domain import date_fmt_str
from neotime import datetime
from typing import Dict, List, Union, Optional


class Textbook(Entity):
    """
    Python representation of a Textbook model.

    `title`: title of the book
    `user_ids`: IDs from the `users` service that have access to this textbook
    """

    title: str = None
    user_ids: List[int] = []
    created_at: datetime = None
    updated_at: datetime = None

    def __init__(self, id: Optional[int], user_ids: List[int], title: str, created_at=datetime.now(), updated_at=datetime.now()):
        Entity.__init__(self, id)
        self.title = title
        self.user_ids = user_ids
        self.created_at = created_at
        self.updated_at = updated_at

    def serialize(self) -> Dict[str, Union[str, int, float, None, List[int]]]:
        """Serialize a `Textbook` object into a `dict`"""
        return {
            'id': self.id,
            'title': self.title,
            'user_ids': self.user_ids,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }

    def deserialize(**kwargs) -> 'Textbook':
        """Deserialize a `dict` into a `User`"""
        return Textbook(kwargs['id'], kwargs['title'], kwargs['user_ids'], kwargs['created_at'], kwargs['updated_at'])
