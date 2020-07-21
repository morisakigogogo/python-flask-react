from ._base import ModelSchema
from ..models import Project


class ProjectScheme(ModelSchema):
    class Meta:
        model = Project

    # project_type = fields.Method('_project_type')
    #
    # @staticmethod
    # def _project_type(obj):
    #     if isinstance(obj.content_type, ProjectType):
    #         return obj.project_type.value
    #     else:
    #         return obj.project_type
