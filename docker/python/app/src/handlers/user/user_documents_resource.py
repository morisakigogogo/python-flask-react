from flask import request
from flask_restful import Resource
from ...models import Document
from ...schemes import DocumentScheme
from ...utils.utils import get_res_data


class UserDocumentsResource(Resource):

    def get(self):
        type = request.args.get('type')
        documents = Document.query.filter(
            Document.type == type
        ).order_by(Document.id).all()
        data = {
            'documents': DocumentScheme().dump(documents, many=True)
        }
        return get_res_data(data=data), 200
