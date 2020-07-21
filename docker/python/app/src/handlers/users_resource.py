# coding: UTF-8
from flask import request, g
from flask_restful import Resource
from ..models import User, db
from ..schemes import UserScheme
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required)
from ..utils.utils import dictUnderline2hump


class UsersResource(Resource):
    @jwt_required
    def get(self):
        users = db.session.query(User).all()
        d = {'data': UserScheme().dump(users, many=True)}
        return {**g.get_err_msg(), **d}, 200

    def post(self):
        data = request.get_json()
        res_email = data.get("email")
        res_password = data.get("password")
        if 'application/json' not in request.headers['Content-Type']:
            return g.get_err_msg('http', 'err1'), 400
        if not (res_email and res_password):
            return g.get_err_msg('http', 'err2'), 400
        user = db.session.query(User).filter(User.email == data.get('email')).first()
        if user is not None:
            return g.get_err_msg('user', 'err1'), 409
        access_token = create_access_token(identity=res_email)
        refresh_token = create_refresh_token(identity=res_email)
        # password = User.generate_hash(res_password)
        db.create(User, email=res_email, password=res_password, school_id=1)

        _data = {**UserScheme().dump(user), 'access_token': access_token, 'refresh_token': refresh_token}

        data = dictUnderline2hump(_data)
        return {**g.get_err_msg(), **{'data': data}}, 200

    def put(self, id):
        g.abort_doesnt_exist(db, User, User.id, id)
        data = request.get_json()
        res_name = data.get("name")
        user = db.session.query(User).filter(User.id == id).first()

        if user is None:
            return g.get_res_data(rmg="ユーザーIDが存在しません。"), 404
        user.name = res_name
        db.session.commit()

        user = db.session.query(User).filter(User.id == id).first()
        data = {**UserScheme().dump(user)}
        return {**g.get_err_msg(), **{'data': data}}, 200
