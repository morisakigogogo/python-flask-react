from ..handlers import (
    UserProjectsResource,
    UserProjectAssetsResource,
    UserProjectFilesResource,

    UserDocumentsResource,
)


def project_register_views(app, Api):
    api = Api(app)

    api.add_resource(UserProjectsResource, '/user/projects', '/user/projects/<int:project_id>')
    api.add_resource(UserProjectAssetsResource, '/user/projects/<int:project_id>/assets')
    api.add_resource(UserProjectFilesResource, '/user/projects/<int:project_id>/files')
    api.add_resource(UserDocumentsResource, '/user/documents')
