from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from app import db
from sqlalchemy_imageattach.entity import Image, image_attachment
from sqlalchemy.orm import relationship

# from datetime import datetime

class User(UserMixin, db.Model):
    id = db.Column(db.String(100), primary_key=True)
    password = db.Column(db.String(200))
    name = db.Column(db.String(100))
    __tablename__ = "user"
    __table_args__ = {'extend_existing': True} 



class Item(db.Model):
    itemId = db.Column(db.String(100), primary_key=True)
    userId = db.Column(db.String(100))
    mfgDate = db.Column(db.DateTime)
    expDate = db.Column(db.DateTime)
    category = db.Column(db.String(100))
    subCategory = db.Column(db.String(100))
    countable = db.Column(db.Boolean)
    frozen = db.Column(db.Boolean)
    totalVol = db.Column(db.Integer)
    consumptionRate = db.Column(db.Float)
    memo = db.Column(db.String(100))
    img = image_attachment('itemPicture')
    __tablename__ = "item"

class ItemPicture(db.Model, Image):
    """User picture model."""

    user_id = db.Column(db.String(100), db.ForeignKey('item.itemId'))
    user = relationship('Item')
    __tablename__ = 'user_picture'