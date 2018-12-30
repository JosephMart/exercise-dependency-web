from abc import ABC, abstractmethod
from typing import Dict, Union, Type, Optional

class Entity(ABC):
    """
    Base entity class which all nodes and relationships inherit from.
    This class is abstract and should not be instantiated.

    `id`: the Neo4j ID
    """

    id: Optional[int, None] = None

    def __init__(self, id: Optional[int, None]):
        self.id = id

    @abstractmethod
    def serialize(self) -> Dict[str, Union[str, int, float, None]]:
        pass

    @abstractmethod
    @staticmethod
    def deserialize(**kwargs) -> Type[Entity]:
        pass
