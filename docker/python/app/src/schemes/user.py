from ._base import ModelSchema
from ..models import User


class UserScheme(ModelSchema):
    class Meta:
        model = User
