from flask import Blueprint, request, Response, jsonify
from app import db
from tables import Item, Category
from datetime import datetime
from datetime import timedelta
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
    '''
    전체 이미지에서 발견된 객체만 잘라주는 함수
    parameters:
        img:PIL.Image, cor:list (사진을 자를 좌표를 담음,(startX,startY,endX,endY))
    '''
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
    식료품 구매 시 넘겨받은 정보들을 DB에 저장하는 함수
    req: userId, category, subCategory, name
    res: Response(status=200) 등으로 성공, 실패여부를 status로 구분
    """
    #식료품 구매 시 넘겨받을 정보들 
    userId = request.json['userId']
    category = request.json['category']
    subCategory = request.json['subCategory']
    name = request.json['name']
    itemCategory = Category.query.filter_by(category=category, subCategory = subCategory).first()
    mfgDate = datetime.now()

    new_item = Item(userId = userId, mfgDate=mfgDate, expDate = mfgDate + itemCategory.expDate, countable = itemCategory.countable, consumptionRate = 1, name = name)

    # add the new item to the database
    db.session.add(new_item)
    db.session.commit()
    print("구매 완료")
    return Response(status=200)


@item.route('/item/get', methods=['POST'])
def getItem():
    """
    카테고리 페이지를 열어서 저장된 식료품 정보를 불러오는 함수
    조만간 /category/fruit 이런 식으로 바꿀 예정
    req: userId, category
    res: 해당 카테고리에 해당되는 식료품 정보 : json list
    """
    print("get")
    userId = request.json['userId']
    res = []
    getItems = Item.query.filter_by(userId=userId)
    for i in getItems:
        res.append({"itemId":i.itemId, "name":i.name, "userId":i.userId, "mfgDate":i.mfgDate, "expDate": i.expDate, "category": i.category, "subCategory":i.subCategory,"countable":i.countable, "frozen":i.frozen, "totalVol":i.totalVol, "consumptionRate":i.consumptionRate, "memo":i.memo, "imgKey":i.imgKey })
    return jsonify(res)


@item.route('/item/newimage', methods=['POST'])
def addnewItem():
    """
    냉장고 사진을 받아오면 사진에 있는 식료품을 인식/분류하여 DB에 저장하는 함수
    req: dataForm - file에 이미지 전송
    res: {이미지가 서버에 저장된 주소값, 인식된이미지 좌표값, 라벨(이름, 카테고리, 서브카테고리), 예상 유통기한}의 list
    """
    image = request.files['file']
    userId = request.form['id']
    #print(userId)
    filename = image.filename.split(".")[0]
    temp = Image.open(image)
    cors = setup.Detection(temp)
    cropped_imgs = getCropImage(temp, cors)
    category_list = []
    res = []

    for i in range(len(cropped_imgs)):
        cropped_imgs[i].save(str(i)+".jpg")
        subCategory = setup.Classification(cropped_imgs[i])
        category_list.append(subCategory)
        img = open(str(i)+".jpg", 'rb')
        #S3에 crop image 저장
        S3.Bucket(BUCKET_NAME).put_object(Key=filename+str(i), Body=img, ContentType='image/jpg')
        now = datetime.now()
        # print(subCategory) #인식된 식재료 출력
        print(subCategory)
        itemCategory = Category.query.filter_by(subCategory=subCategory.lower()).first()
        # 인식된 식재료를 DB에 저장, 추후에 userID 넘겨받아야함.
        new_item = Item(userId = userId, mfgDate = now, expDate = now + timedelta(days = itemCategory.expDate), category = itemCategory.category, subCategory = itemCategory.subCategory, countable = itemCategory.countable, consumptionRate = 1, name = itemCategory.name, imgKey = filename+str(i))
        db.session.add(new_item)
        db.session.commit()
        # res에 아이템 정보 추가
        res.append({"itemId": new_item.itemId, "imgKey":filename+str(i), "startX": cors[0][i], "startY": cors[2][i], "endX":cors[1][i], "endY":cors[3][i], "category": itemCategory.category , "subCategory": itemCategory.subCategory })

    return jsonify(res)


@item.route('/item/update', methods=['POST'])
def updateItem():
    item = request.json['item']
    itemId = item['itemId']
    consumptionRate = item['consumptionRate']
    db.session.query(Item).filter(Item.itemId==itemId).update({'consumptionRate': consumptionRate})
    db.session.commit()
    return Response(status=200)

@item.route('/item/delete', methods=['POST'])
def deleteItem():
    itemId = request.json['itemId']
    db.session.query(Item).filter(Item.itemId==int(itemId)).delete()
    db.session.commit()
    return Response(status=200)