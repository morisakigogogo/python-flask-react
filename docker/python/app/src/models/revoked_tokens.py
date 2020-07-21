# coding: utf-8
from .db_init import db


class RevokedTokenModel(db.Model):
    tablename = 'revoked_tokens'
    __tablename__ = 'revoked_tokens'
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120))

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = db.session.query(cls).filter_by(jti=jti).first()
        return bool(query)
