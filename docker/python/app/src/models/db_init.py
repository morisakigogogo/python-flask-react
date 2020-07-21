from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from ..app import application
from ..utils import utils


def create(model, **kwargs):
    # data = User(email=res_email, password=res_password, school_id=1)
    data = model(**kwargs)
    db.session.add(data)
    db.session.commit()


def evaluated_now(context):
    # created_at と updated_at で２回 datetime.now を評価しないよう context に保存しておく
    if 'now' not in context.current_parameters:
        context.current_parameters['now'] = datetime.now()
    return context.current_parameters['now']


db = SQLAlchemy(application)
db.init_app(application)
db.Model.to_dict = utils.to_dict
db.create = create
