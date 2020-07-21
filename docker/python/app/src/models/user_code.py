from .db_init import db, evaluated_now


class UserCode(db.Model):
    tablename = 'user_codes'
    __tablename__ = tablename

    id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger)
    code = db.Column(db.Text, default=None)
    type = db.Column(db.String(32), default=None)
    language = db.Column(db.String(32), default=None)
    created_at = db.Column(db.DateTime, default=evaluated_now, nullable=False)
    updated_at = db.Column(db.DateTime, default=evaluated_now, nullable=False)
