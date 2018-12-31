from project.db.domain.entity import Entity
from project.db.domain import date_fmt_str
from datetime import datetime
from typing import Dict, Union, Optional


class Exercise(Entity):
    """
    Python representation of an Exercise model.

    `question`: question users need to answer
    `solution`: answer to the question
    """

    question: str = None
    solution: str = None
    hint: str = None
    created_at: datetime = None
    updated_at: datetime = None

    def __init__(self, id: Optional[int, None], question: str, solution: str, hint: str, created_at=datetime.now(), updated_at=datetime.now()):
        Entity.__init__(self, id)
        self.question = question
        self.solution = solution
        self.hint = hint
        self.created_at = datetime.strptime(created_at, date_fmt_str)
        self.updated_at = datetime.strptime(updated_at, date_fmt_str)

    def serialize(self) -> Dict[str, Union[str, int, float, None]]:
        """Serialize an `Exercise` object into a `dict`"""
        return {
            'id': self.id,
            'question': self.question,
            'solution': self.solution,
            'hint': self.hint,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }

    def deserialize(**kwargs) -> Exercise:
        """Deserialize a `dict` into an `Exercise` object"""
        return Exercise(kwargs['id'], kwargs['question'], kwargs['solution'], kwargs['hint'], kwargs['created_at'], kwargs['updated_at'])
