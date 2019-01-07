import uuid

from py2neo.ogm import GraphObject, Property, RelatedFrom


class Textbook(GraphObject):
    __primarykey__ = "uuid"

    uuid = Property()
    title = Property()

    chapters = RelatedFrom("Chapters", "CHAPTER_OF")

    # children = RelatedTo(Chapter, "PARENT_OF")
