from ..handlers import (
    HealthResource,
    HealthDbResource,
)


def health_register_views(app, Api):
    api = Api(app)
    api.add_resource(HealthResource, '/health')
    api.add_resource(HealthDbResource, '/health/db')
