from .db_init import db, evaluated_now
from passlib.hash import pbkdf2_sha256 as sha256


class User(db.Model):
    tablename = 'users'
    __tablename__ = 'users'

    id = db.Column(db.BigInteger, primary_key=True)
    school_id = db.Column(db.BigInteger)
    is_admin = db.Column(db.Boolean, default=False)
    is_manager = db.Column(db.Boolean, default=False)
    name = db.Column(db.String(100))
    email = db.Column(db.String(255))
    password = db.Column(db.String(255))
    token = db.Column(db.String(255))
    type_count = db.Column(db.Integer, default=0)
    login_at = db.Column(db.DateTime, default=None)
    created_at = db.Column(db.DateTime, default=evaluated_now, nullable=False)
    updated_at = db.Column(db.DateTime, default=evaluated_now, nullable=False)

    # def __init__(self, name, email):
    #     self.name = name
    #     self.email = email

    def __repr__(self):
        return '<User %r>' % self.email

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return password == hash
        # return sha256.verify(password, hash)
