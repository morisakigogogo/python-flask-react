from flask import Flask
from flask_marshmallow import Marshmallow
from flask_jwt_extended import (get_jwt_identity)
from ..models import User

app = Flask(__name__)
ma = Marshmallow(app)


class ModelSchema(ma.ModelSchema):
    def __init__(self, *args, **kwargs):
        include = kwargs.get('include', [])
        exclude = kwargs.get('exclude', [])
        if not (isinstance(include, list) or isinstance(include, tuple)):
            raise ValueError('`include` option must be a list or tuple.')
        elif include:
            self.opts.exclude = list(set(self.opts.exclude) - set(include))
            del kwargs['include']
        if not (isinstance(exclude, list) or isinstance(exclude, tuple)):
            raise ValueError('`exclude` option must be a list or tuple.')
        elif exclude:
            self.opts.exclude = list(set(self.opts.exclude) | set(exclude))
            del kwargs['exclude']
        super().__init__(*args, **kwargs)

    def dump(self, obj, many=None, **kwargs):
        # 最新のmarshmallowのdumpは引数がmanyまでなのでflask_marshmallowのバージョンがあがれば変更
        if not obj:
            return {}
        data = super().dump(obj, many=many, **kwargs)
        if hasattr(self.Meta, 'exclude'):
            self.opts.exclude = self.Meta.exclude
        return data

    def get_cur_user_info(self):
        cur_user = get_jwt_identity()
        user_info = User.query.filter_by(email=cur_user).first()
        id = user_info and user_info.to_dict()['id']
        return id
