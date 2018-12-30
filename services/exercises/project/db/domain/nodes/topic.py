from project.db.domain.entity import Entity
from project.db.domain import date_fmt_str
from datetime import datetime
from typing import Dict, Union, Optional


class Topic(Entity):
    """
    Python representation of a Topic model.

    `title`: title of the topic
    """

    title: str = None
    created_at: datetime = None
    updated_at: datetime = None

    def __init__(self, id: Optional[int, None], title: str, created_at=datetime.now(), updated_at=datetime.now()):
        Entity.__init__(self, id)
        self.title = title
        self.created_at = datetime.strptime(created_at, date_fmt_str)
        self.updated_at = datetime.strptime(updated_at, date_fmt_str)

    def serialize(self) -> Dict[str, Union[str, int, float, None]]:
        """Serialize a `Topic` object into a `dict`"""
        return {
            'id': self.id,
            'title': self.title,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }

    def deserialize(**kwargs) -> Topic:
        """Deserialize a `dict` into a `Topic` object"""
        return Topic(kwargs['id'], kwargs['title'], kwargs['created_at'], kwargs['updated_at'])