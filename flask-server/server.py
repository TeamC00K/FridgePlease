from crypt import methods
from flask import Flask, request, render_template, session, url_for, redirect
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

app = Flask("__name__")

@app.route("/")
def my_index():
    return render_template("index.html")

@app.route("/", methods=['GET'])
def return_index():
    return {
        'name': "hello world!"
    }

'''
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['username'] 
        password = request.form['password']
        userinfo[name] = password
        
        return redirect(url_for('login'))
    else:
        return render_template('register.html')
'''


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)