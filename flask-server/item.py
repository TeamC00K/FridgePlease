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


def getCropImage(img, cor):
    detectcnt = len(cor[0])
    img_list = []
    for i in range(detectcnt):
        # area = (startX,startY,endX,endY)
        area = (cor[0][i],cor[2][i],cor[1][i],cor[3][i])
        img_list.append(img.crop(area))
    return img_list


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
    # userId = request.json['userId']
    filename = image.filename.split(".")[0]
    temp = Image.open(image)
    cors = setup.Detection(temp)
    cropped_imgs = getCropImage(temp, cors)
    category_list = []
    
    for i in range(len(cropped_imgs)):
        cropped_imgs[i].save(str(i)+".jpg")
        category = setup.Classification(temp)
        category_list.append(category)
    temp.save("temp.jpg")
    img = open("temp.jpg", 'rb')
    
    S3.Bucket(BUCKET_NAME).put_object(Key=filename, Body=img, ContentType='image/jpg')
    #crop하는 과정 추가.
    # 커태고리 분류
    # db.session.execute("INSERT INTO Category (category,subCategory,expDate,countable,imgKey) values('fruit', 'apple', 30 , true ,'apple')")
    mfgDate = datetime.now()
    print("좌표: ",cors)
    #itemCategory = Category.query.filter_by(category=category).first()
    #new_item = Item(userId = userId, mfgDate=mfgDate, expDate = mfgDate + itemCategory.expDate, countable = itemCategory.countable, consumptionRate = 1)

    # add the new item to the database
    #db.session.add(new_item)
    #db.session.commit()

    return jsonify(cors)


@item.route('/item/update', methods=['POST'])
def updateItem():
    pass

@item.route('/item/delete', methods=['POST'])
def deleteItem():
    pass


