from flask import Flask, request, make_response, jsonify

app = Flask(__name__)


@app.route('/data')
def data():
    return {
        "elems": ['data1', 'data2']
    }


@app.route('/files', methods=['POST'])
def getClientFiles():
    getData = request.files
    for i in range(len(getData)):
        print(getData[f'file_{i}'])
    res = make_response(jsonify({"message": "files were received"}), 200)
    return res


if __name__ == '__main__':
    app.run(debug=True)
