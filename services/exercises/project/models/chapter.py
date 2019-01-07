import uuid

from py2neo.ogm import GraphObject, Property, RelatedTo
from project.models.textbook import Textbook


class Chapter(GraphObject):
    __primarykey__ = "uuid"

    uuid = Property()
    name = Property()

    # children = RelatedFrom("Chapter", "PARENT_OF")

    # parent_of = RelatedFrom()
    textbook = RelatedTo(Textbook)
