from project.db.domain.entity import Entity
from project.db.domain import date_fmt_str
from datetime import datetime
from typing import Dict, List, Union, Optional


class Textbook(Entity):
    """
    Python representation of a Textbook model.

    `title`: title of the book
    `author_id`: ID from the `users` service
    """

    title: str = None
    author_id: int = None
    created_at: datetime = None
    updated_at: datetime = None

    def __init__(self, id: Optional[int, None], author_id: int, title: str, created_at=datetime.now(), updated_at=datetime.now()):
        Entity.__init__(self, id)
        self.title = title
        self.author_id = author_id
        self.created_at = datetime.strptime(created_at, date_fmt_str)
        self.updated_at = datetime.strptime(updated_at, date_fmt_str)

    def serialize(self) -> Dict[str, Union[str, int, float, None]]:
        """Serialize a `Textbook` object into a `dict`"""
        return {
            'id': self.id,
            'title': self.title,
            'author_id': self.author_id,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }

    def deserialize(**kwargs) -> Textbook:
        """Deserialize a `dict` into a `User`"""
        return Textbook(kwargs['id'], kwargs['title'], kwargs['author_id'], kwargs['created_at'], kwargs['updated_at'])
