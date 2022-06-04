from flask import Blueprint, request, Response, jsonify
from app import db
from models import Item, ItemPicture, Category
from datetime import datetime

item = Blueprint('item', __name__)

@item.route('/item/add', methods=['POST'])
def addItem():
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


@item.route('/item/update', methods=['POST'])
def updateItem():
    pass