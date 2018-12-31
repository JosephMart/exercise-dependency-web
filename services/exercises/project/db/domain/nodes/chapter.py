from project.db.domain.entity import Entity
from project.db.domain import date_fmt_str
from neotime import datetime
from typing import Dict, Union, Optional, List


class Chapter(Entity):
    """
    Python representation of a Chpater model.

    `title: title of the chapter
    """

    title: str = None
    created_at: datetime = None
    updated_at: datetime = None

    def __init__(self, id: Optional[int], title: str, created_at=datetime.now(), updated_at=datetime.now()):
        Entity.__init__(self, id)
        self.title = title
        self.created_at = created_at
        self.updated_at = updated_at

    def serialize(self) -> Dict[str, Union[str, int, float, None, List[int]]]:
        """Serialize a `Chapter` object into a `dict`"""
        return {
            'id': self.id,
            'title': self.title,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }

    def deserialize(**kwargs) -> 'Chapter':
        """Deserialize a `dict` into a `Chapter` object"""
        return Chapter(kwargs['id'], kwargs['title'], kwargs['created_at'], kwargs['updated_at'])
