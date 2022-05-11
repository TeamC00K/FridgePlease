from flask import Flask, request, render_template, session, url_for, redirect

app = Flask("__main__")

@app.route("/")
def my_index():
    return render_template("index.html")
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