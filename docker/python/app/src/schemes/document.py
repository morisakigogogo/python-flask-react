from ._base import ModelSchema
from ..models import Document
from ..models.types.document_content_type import DocumentContentType


class DocumentScheme(ModelSchema):
    class Meta:
        model = Document

    # content_type = fields.Method('_content_type')

    @staticmethod
    def _content_type(obj):
        if isinstance(obj.content_type, DocumentContentType):
            return obj.content_type.value
        else:
            return obj.content_type
