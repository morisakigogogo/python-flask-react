from ..handlers import (
    AuthResource,
    UsersResource,
    DocumentsResource,
    UsersSignInResource,
    TokenRefreshResource,
    SignoutAccessResource,
    SignoutRefreshResource,
    UserCodesResource,
)


def user_register_views(app, Api):
    api = Api(app)

    api.add_resource(AuthResource, '/auth')
    api.add_resource(UsersResource, '/users', '/users/<int:id>')
    api.add_resource(UserCodesResource, '/users/<int:user_id>/codes')
    api.add_resource(UsersSignInResource, '/signin')
    api.add_resource(DocumentsResource, '/documents')
    api.add_resource(TokenRefreshResource, '/token/refresh')
    api.add_resource(SignoutAccessResource, '/signout/access')
    api.add_resource(SignoutRefreshResource, '/signout/refresh')
