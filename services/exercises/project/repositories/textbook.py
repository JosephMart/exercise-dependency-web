from project import get_db
from project.db.domain.nodes.textbook import Textbook
from typing import List


class TextbookRepository():
    @staticmethod
    def find_textbooks_by_user(user_id: int) -> List[Textbook]:
        pass
        # textbooks: List[Textbook] = []
        # with get_db().begin_transaction() as tx:
        #     record: Record
        #     for record in tx.run("MATCH (t:Textbook) "
        #                          "WHERE {user_id} IN t.user_ids "
        #                          "RETURN t", {'user_id': user_id}):
        #         value: Node = record.value()
        #         textbooks.append(Textbook(
        #             value.id,
        #             value.get('title'),
        #             value.get('user_ids'),
        #             value.get('created_at'),
        #             value.get('updated_at')
        #         ))
        # return textbooks
