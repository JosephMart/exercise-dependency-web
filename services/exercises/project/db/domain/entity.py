from abc import ABC, abstractmethod
from typing import Dict, Union, Type

class Entity(ABC):
    """
    Base entity class which all nodes and relationships inherit from.
    This class is abstract and should not be instantiated.

    `id`: the Neo4j ID
    """

    id: int = None

    def __init__(self, id: int):
        self.id = id

    @abstractmethod
    def serialize(self) -> Dict[str, Union[str, int, float]]:
        pass

    @abstractmethod
    @staticmethod
    def deserialize(**kwargs) -> Type[Entity]:
        pass
