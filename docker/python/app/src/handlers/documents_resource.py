# coding; UTF-8
from flask import g
from flask_restful import Resource
from ..models import Document
from ..schemes import DocumentScheme
from ..utils.utils import get_res_data


class DocumentsResource(Resource):
    def get(self):
        documents = g.session.query(Document).all()
        d = {'data': DocumentScheme().dump(documents, many=True)}
        return get_res_data(data=d), 200
