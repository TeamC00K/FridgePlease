from flask import Blueprint
from app import db

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return 'Index'

@main.route('/profile')
def profile():
    return 'Profile'



'''

from requests import Response
from flask import Flask, request, render_template, session, url_for, redirect, make_response
from flask_sqlalchemy import SQLAlchemy
from .models import User

app = Flask("__name__")
db = SQLAlchemy(app)



@app.route("/")
def my_index():
    return render_template("index.html")

@app.route("/", methods=['GET'])
def return_index():
    return {
        'name': "hello world!"
    }

@app.route("/login" , methods=['POST'])
def login():
    # print("login")
    userid = request.form['userid']
	pw = request.form['password']
    try:
        data = User.query.filter_by(userid = userid, password = pw).first()	# ID/PW 조회Query 실행
        res = Response("login", 200, {"userid" : userid, "password": pw})
        if data is not None:	# 쿼리 데이터가 존재하면
            session['userid'] = userid	# userid를 session에 저장한다.
            return redirect('/')
        else:
            return 'Dont Login'	# 쿼리 데이터가 없으면 출력
    except:
        return "dont login"	# 예외 상황 발생 시 출력


@app.route('/logout', methods=['GET'])
def logout():
	session.pop('userid', None)
	return redirect('/')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['username'] 
        password = request.form['password']
        userinfo[name] = password
        
        return redirect(url_for('login'))
    else:
        return render_template('register.html')



if __name__ == "__main__":
    app.run(debug=True)'''