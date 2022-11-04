from flask import Flask

app = Flask(__name__)


@app.route('/')
def data():
    return {
        'k1': 'whale',
        'k2': 'greenland'
    }


if __name__ == '__main__':
    app.run(debug=True)
