from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from app import db
# from datetime import datetime

class User(UserMixin, db.Model):
    id = db.Column(db.String(100), primary_key=True)
    password = db.Column(db.String(200))
    name = db.Column(db.String(100))