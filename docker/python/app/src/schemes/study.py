from flask_marshmallow.fields import fields
from ._base import ModelSchema


class StudyScheme(ModelSchema):
    class Meta:
        exclude = ['questions']
