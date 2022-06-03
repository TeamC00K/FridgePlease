from flask import Blueprint, request, Response
from app import db
from models import Item, ItemPicture, Category
from datetime import datetime

item = Blueprint('item', __name__)

@item.route('/item/get', methods=['POST'])
def item_get():
    #식료품 구매 시 넘겨받을 정보들 
    itemId = request.json['itemId']
    userId = request.json['userId']
    category = request.json['category']
    getCategory = Category.query.filter_by(category=category).first()
    mfgDate = datetime.now()

    new_item = Item(itemId = itemId, userId = userId, mfgDate=mfgDate, expDate = mfgDate + getCategory.expDate, countable = getCategory.countable, consumptionRate = 1)

    # add the new item to the database
    db.session.add(new_item)
    db.session.commit()
    print("new_item input success")
    return Response(status=200)