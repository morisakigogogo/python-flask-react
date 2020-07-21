# coding: utf-8
# from .types.document_content_type import DocumentContentType
from .db_init import db, evaluated_now


class Document(db.Model):
    tablename = 'documents'
    __tablename__ = 'documents'
    id = db.Column(db.BigInteger, primary_key=True)
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    content = db.Column(db.Text)
    type = db.Column(db.String(32))
    # content_type = db.Column(ChoiceType(DocumentContentType, impl=db.Integer()))
    video_url = db.Column(db.String(255))
    thumbnail_url = db.Column(db.String(255))
    order = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=evaluated_now, nullable=False)
    updated_at = db.Column(db.DateTime, default=evaluated_now, onupdate=evaluated_now, nullable=False)
