import os
import patoolib
import shutil
from werkzeug.utils import secure_filename
from flask import Flask, request, make_response, jsonify, send_file


UPLOAD_FOLDER = './uploaded'
RESULT_FOLDER = './result'
ALLOWED_EXTENSIONS = set(['jp2', 'raw', 'png', 'jpg', 'jpeg', 'zip', 'rar', 'gz', '7z'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER


def allowed_file(filename):
    """Проверка допустимых типов загружаемых файлов"""
    ext = filename.rsplit('.', 1)[1]
    return ext if '.' in filename and ext in ALLOWED_EXTENSIONS else False


def process():
    """Обработка изображений нейросетью"""
    for i in os.listdir(app.config['UPLOAD_FOLDER']):
        src = os.path.join(app.config['UPLOAD_FOLDER'], i)
        dst = os.path.join(app.config['RESULT_FOLDER'], i)
        # shutil.copy(src, dst)


@app.route('/<name>')
def result_images(name):
    """Возврат обработанных изображений клиенту"""
    return send_file(os.path.join(app.config['RESULT_FOLDER'], name))


@app.route('/files', methods=['POST'])
def get_client_files():
    """Получение файлов от клиента и их обработка"""
    files = request.files
    for i in range(len(files)):
        f = files[f'file_{i}']
        f_ext = allowed_file(f.filename)
        if f and f_ext:
            filename = secure_filename(f.filename)
            path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            f.save(path)
            if f_ext == 'zip' or f_ext == 'gz' or f_ext == 'rar' or f_ext == '7z':
                patoolib.extract_archive(path, outdir=app.config['UPLOAD_FOLDER'])
                os.remove(path)
    process()
    # res = make_response(jsonify(os.listdir(app.config['UPLOAD_FOLDER'])[1:]), 200)
    res = (['Files were received:'], 200)
    return res


@app.route('/result')
def get_result_csv():
    print(f"RESULT_PATH, {os.path.join(app.config['RESULT_FOLDER'], 'result.csv')}")
    return send_file(os.path.join(app.config['RESULT_FOLDER'], 'result.csv'), mimetype='text/csv',)


if __name__ == '__main__':
    app.run(debug=True)
