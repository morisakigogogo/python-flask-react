import json
from flask import make_response
from flask_restful import Api
from . import application
from .router_apis.health import health_register_views
from .router_apis.user import user_register_views
from .router_apis.project import project_register_views


api = Api(application)


@api.representation('application/json')
def output_json(data, code, headers):
    resp = make_response(json.dumps(data, ensure_ascii=False), code)
    resp.headers.extend(headers)
    return resp


health_register_views(application, Api)
user_register_views(application, Api)
project_register_views(application, Api)
