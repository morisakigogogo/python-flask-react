from flask import jsonify, request, g
from flask_restful import Resource
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
import datetime
from ..models import User, RevokedTokenModel, db
from ..schemes import UserScheme
from ..app import jwt
from ..utils.utils import get_err_msg, dictUnderline2hump


class AuthResource(Resource):

    def get(self):
        res = g.get_err_msg()
        return jsonify(res)


class UsersSignInResource(Resource):
    def post(self):
        data = request.get_json()
        res_email = data.get('email')
        res_password = data.get('password')
        cur_user = db.session.query(User).filter_by(email=res_email).first()
        email = cur_user and cur_user.to_dict()['email']
        password = cur_user and cur_user.to_dict()['password']
        if email is None:
            return g.get_err_msg('user', 'err2'), 400
        # if User.verify_hash(res_password, password):
        if res_password == password:
            expires = datetime.timedelta(days=1)
            access_token = create_access_token(identity=res_email, expires_delta=expires)
            refresh_token = create_refresh_token(identity=res_email)
            userinfo = UserScheme().dump(cur_user)
            del userinfo['password']
            _data = {**userinfo, 'access_token': access_token, 'refresh_token': refresh_token}
            data = dictUnderline2hump(_data)
            return g.get_res_data(rmg='ログイン成功しました！', data=data), 200
        else:
            return g.get_err_msg('user', 'err3'), 400


class TokenRefreshResource(Resource):
    @jwt_refresh_token_required
    def get(self):
        current_user = get_jwt_identity()
        expires = datetime.timedelta(days=1)
        access_token = create_access_token(identity=current_user, expires_delta=expires)
        data = {'access_token': access_token}
        return g.get_res_data(data=data), 200


class SignoutAccessResource(Resource):
    @jwt_required
    def delete(self):
        jti = get_raw_jwt()['jti']
        try:
            RevokedTokenModel(jti=jti)
            return g.get_res_data(rmg='ログアウトしました！'), 200
        except:
            return {'rmg': 'ログアウトエラーです。'}, 500


class SignoutRefreshResource(Resource):
    @jwt_refresh_token_required
    def delete(self):
        jti = get_raw_jwt()['jti']
        try:
            RevokedTokenModel(jti=jti)
            return g.get_res_data(rmg='リフレシュトークンは取り消されました！'), 200
        except:
            return {'rmg': 'サーバーエラーです。'}, 500


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedTokenModel.is_jti_blacklisted(jti)


@jwt.invalid_token_loader
def invalid_token_callback(token):
    return get_err_msg('auth', 'err1'), 422


@jwt.expired_token_loader
def expired_token_callback():
    return get_err_msg('auth', 'err2'), 401
