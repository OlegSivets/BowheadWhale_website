from flask import *
import os
import matplotlib.pyplot as plt

UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = set(['jp2', 'raw', 'png', 'jpg', 'jpeg', 'zip'])

app = Flask(__name__)

UPLOAD_FOLDER = '/uploaded'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/data')
def data():
    return {
        "elems": ['data1', 'data2']
    }


@app.route('/files', methods=['POST'])
def getClientFiles():
    getData = request.files
    for i in range(len(getData)):
        f = getData[f'file_{i}']
        f.save('./uploaded/' + f.filename)
        #return redirect(url_for('uploaded_file', filename=filee.filename))
    res = make_response(jsonify({"message": "files were received"}), 200)
    return res

# @app.route('/result', methods=['POST'])
# def showResultFiles():
#     plt.imshow()

if __name__ == '__main__':
    app.run(debug=True)
