import os
import patoolib
import shutil
import os
import torch
import numpy as np
import pandas as pd

from werkzeug.utils import secure_filename
from flask import Flask, request, make_response, jsonify, send_file

from model import ft_net
from torchvision import transforms
from PIL import Image



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

def reorganize():
    """Проверка допустимых типов загружаемых файлов"""
    for i in os.listdir(app.config['UPLOAD_FOLDER'])[1:]:
        folder = i.split('_')[1]
        if not os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'], folder)):
            os.mkdir(os.path.join(app.config['UPLOAD_FOLDER'], folder))
        shutil.move(os.path.join(app.config['UPLOAD_FOLDER'], i), os.path.join(app.config['UPLOAD_FOLDER'], folder))


def clear():
    for i in os.listdir(app.config['UPLOAD_FOLDER'])[1:]:
        if i == '.gitkeep': continue
        elif i == 'res.csv': os.remove(os.path.join(app.config['UPLOAD_FOLDER'], i))
        else: shutil.rmtree(os.path.join(app.config['UPLOAD_FOLDER'], i))
    for i in os.listdir(app.config['RESULT_FOLDER'])[1:]:
        if i == '.gitkeep': continue
        elif i == 'result.csv': os.remove(os.path.join(app.config['UPLOAD_FOLDER'], i))
        else: shutil.rmtree(os.path.join(app.config['UPLOAD_FOLDER'], i))


def process():
    """Обработка изображений нейросетью"""
    reorganize()
    device = torch.device('cpu' if torch.cuda.is_available() else 'gpu')
    
    model = ft_net(102)
    model.load_state_dict(torch.load('model/ft_ResNet50/net_last.pth'))

    model = model.to(device) # Set model to gpu


    data_transforms = transforms.Compose([
            transforms.Resize((256,128), interpolation=3),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]) 
        ])


    res = []
    model.eval()
    with torch.no_grad():
        for dir, fold, files in os.walk(app.config['UPLOAD_FOLDER']):
            predictions = []
            if files[0] == '.gitkeep': continue
            for fileq in files:
                img = Image.open(os.path.join(dir, fileq)).convert('RGB')
                if img.width < img.height: 
                    img = img.rotate(90, expand=True)
                img_preproc = data_transforms(img)
                inputs = torch.unsqueeze(img_preproc, 0)
                pred = model(inputs)
                pred = pred.detach().cpu().numpy()
                predictions.append(np.argmax(pred) + 1)
                if not os.path.exists(os.path.join(dir, str(np.argmax(pred) + 1))):
                    os.mkdir(os.path.join(dir, str(np.argmax(pred) + 1)))
                shutil.copy(os.path.join(dir, fileq), os.path.join(app.config['UPLOAD_FOLDER'], str(np.argmax(pred) + 1), fileq))
            unique, counts = np.unique(np.array(predictions), return_counts=True)
            if len(unique):
                st = [dir.split('\\')[-1]]
                st.extend(np.array(sorted(np.asarray((unique, counts)).T, key=lambda x: x[-1], reverse=True))[:5, 0])
                while len(st) < 6: st.append(-1)
                res.append(st)

    df = pd.DataFrame(res, columns=['name','top1','top2','top3','top4','top5'])
    df.to_csv(os.path.join(app.config['UPLOAD_FOLDER'], 'res.csv'), index=False, sep=';')
    shutil.copy(os.path.join(app.config['UPLOAD_FOLDER'], 'res.csv'), os.path.join(app.config['RESULT_FOLDER'], 'result.csv'))
    
    shutil.make_archive(os.path.join(app.config['RESULT_FOLDER'], 'result'), 'zip', os.path.join(app.config['RESULT_FOLDER']))
    clear()


@app.route('/zip')
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
    return send_file(os.path.join(app.config['RESULT_FOLDER'], 'result.csv'), mimetype='text/csv',)


if __name__ == '__main__':
    app.run(debug=True)
