from flask import Blueprint, request, Response, jsonify
from app import db
from tables import Item, ItemPicture, Category
from datetime import datetime
from img_model import setup
import boto3
from botocore.client import Config
import os
from dotenv import load_dotenv
from PIL import Image

item = Blueprint('item', __name__)

load_dotenv()
ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
ACCESS_SECRET_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
BUCKET_NAME = os.environ.get("BUCKET_NAME")

S3 = boto3.resource(
    's3',
    aws_access_key_id=ACCESS_KEY_ID,
    aws_secret_access_key=ACCESS_SECRET_KEY,
    config=Config(signature_version='s3v4')
)

@item.route('/item/add', methods=['POST'])
def addItem():
    """
    식료품 구매 시 넘겨받을 정보들
    수량도 어지간하면 넘겨줬으면 함
    """
    #식료품 구매 시 넘겨받을 정보들 
    itemId = request.json['itemId']
    userId = request.json['userId']
    category = request.json['category']
    itemCategory = Category.query.filter_by(category=category).first()
    mfgDate = datetime.now()

    new_item = Item(itemId = itemId, userId = userId, mfgDate=mfgDate, expDate = mfgDate + itemCategory.expDate, countable = itemCategory.countable, consumptionRate = 1)

    # add the new item to the database
    db.session.add(new_item)
    db.session.commit()
    print("new_item input success")
    return Response(status=200)


@item.route('/item/get')
def getItem():
    userId = request.json['userId']
    category = request.json['category']
    getItems = Category.query.filter_by(userId=userId, category = category)
    return jsonify(getItems)


@item.route('/item/newimage', methods=['POST'])
def addnewItem():
    image = request.files['file']
    filename = image.filename.split(".")[0]
    temp = Image.open(image)
    temp.save("temp.jpg")
    img = open("temp.jpg", 'rb')
    cors = setup.Detection(temp)
    S3.Bucket(BUCKET_NAME).put_object(Key=filename, Body=img, ContentType='image/jpg')
    return jsonify(cors)


@item.route('/item/update', methods=['POST'])
def updateItem():
    pass

@item.route('/item/delete', methods=['POST'])
def deleteItem():
    pass
