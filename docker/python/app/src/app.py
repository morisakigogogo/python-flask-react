from flask import Flask, g, json, request
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .config import configure_app
from .utils import utils


application = Flask(__name__)
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

configure_app(application)
CORS(application, send_wildcard=application.debug)
jwt = JWTManager(application)


@application.before_request
def before_request():
    g.get_err_msg = utils.get_err_msg
    g.get_res_data = utils.get_res_data
    g.abort_doesnt_exist = utils.abort_doesnt_exist


@application.after_request
def after_request(response):
    # g.session.commit()
    # g.session.close()
    response.headers["Cache-Control"] = "no-cache"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = -1
    if application.config['DEBUG']:
        response_log(request, response)
    application.config['JSON_AS_ASCII'] = False
    return response


def response_log(request, response):
    if "health" in request.path:
        return
    data = ''
    if response.headers['Content-Type'] == 'application/json' and response.data != b'':
        data = json.dumps(json.loads(response.data.decode("utf-8")), ensure_ascii=False)
    response_log = {
        'url': request.url,
        'method': request.method,
        'status_code': response.status_code,
        'data': data,
    }
    print(response_log)


@application.route('/')
def hello_world():
    return 'Hello World!'
