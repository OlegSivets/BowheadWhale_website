import os
import patoolib
from werkzeug.utils import secure_filename
from flask import Flask, request, make_response, jsonify, send_file


UPLOAD_FOLDER = './uploaded'
ALLOWED_EXTENSIONS = set(['jp2', 'raw', 'png', 'jpg', 'jpeg', 'zip', 'rar', 'gz', '7z'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    """Проверка допустимых типов загружаемых файлов"""
    ext = filename.rsplit('.', 1)[1]
    return ext if '.' in filename and ext in ALLOWED_EXTENSIONS else False


@app.route('/<name>')
def uploaded_images(name):
    """Возврат загруженных изображений клиенту"""
    return send_file(os.path.join(app.config['UPLOAD_FOLDER'], name))


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
            n = 1
            while os.path.isfile(path):
                parts = path.rsplit('.', 1)
                parts[0] += f'_{str(n)}'
                path = '.'.join(parts)
                n += 1
            f.save(path)
            if f_ext == 'zip' or f_ext == 'gz' or f_ext == 'rar' or f_ext == '7z':
                patoolib.extract_archive(path, outdir=app.config['UPLOAD_FOLDER'])
                os.remove(path)
    res = make_response(jsonify(os.listdir(app.config['UPLOAD_FOLDER'])), 200)
    return res

if __name__ == '__main__':
    app.run(debug=True)
