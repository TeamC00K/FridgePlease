from flask import Blueprint, request, Response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required
import json
from models import User
from app import db

auth = Blueprint('auth', __name__)

@auth.route("/login" , methods=['POST'])
def login():
    userid = request.json['id']
    password = request.json['passwd']
    re = request.form.get('remember')
    remember = True if request.form.get('remember') else False # 이 부분에 대해서 remember라는 값을 어디서 가져오는지 확인해봐야 함.

    user = User.query.filter_by(id=userid).first()
    print(user.id, user.name)
    if not user or not check_password_hash(user.password, password):
        print("login fail")
        res = Response(status=401)
        return res
    data = {}
    data["name"] = user.name
    data["id"] = user.id
    login_user(user, remember=remember)
    print("login success")
    response = Response(json.dumps(data), status=200)
    return response

@auth.route('/register', methods=['POST'])
def signup_post():
    # code to validate and add user to database goes here
    name = request.json['name']
    userid = request.json['id']
    password = request.json['passwd']
    user = User.query.filter_by(id=userid).first() # if this returns a user, then the email already exists in database

    if user: # if a user is found, we want to redirect back to signup page so user can try again
        print("fail")
        return "fail"

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = User(id = userid, password = generate_password_hash(password, method='sha256') ,name=name)

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()
    print("success")
    return "success"

@auth.route('/logout')
def logout():
    logout_user()
    return 'Logout'