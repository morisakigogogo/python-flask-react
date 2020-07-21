# coding:@ utf-8
# from sqlalchemy.orm import relationship
# from sqlalchemy_utils import ChoiceType
from .db_init import db, evaluated_now


class Project(db.Model):
    tablename = 'projects'
    __tablename__ = 'projects'

    id = db.Column(db.BigInteger, primary_key=True)
    # user_id = db.Column(db.BigInteger)
    user_id = db.Column(db.BigInteger, db.ForeignKey('users.id'))
    # user = relationship('User')
    is_released = db.Column(db.Boolean, nullable=False, default=False)
    is_enabled = db.Column(db.Boolean, nullable=False, default=True)
    path = db.Column(db.String(255))
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    is_template = db.Column(db.Boolean, nullable=True, default=False)
    # project_type = db.Column(ChoiceType(ProjectType, impl=db.Integer()))
    created_at = db.Column(db.DateTime, default=evaluated_now, nullable=False)
    updated_at = db.Column(db.DateTime, default=evaluated_now, onupdate=evaluated_now, nullable=False)
