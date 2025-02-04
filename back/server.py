from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

# import dependencies for image prediction

from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"  # Forces TensorFlow to use CPU


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# check if the extension is ok

def allowed_file(filename:str) -> bool:
    """ 
    check if it has extension in name
    checkk i it contains the extension in ALLOWED_EXTENSIONS
    """
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS 


# defines the route to use when accessing "root"
@app.route("/")

def home():
    return jsonify({"message":"dogs or muffins or dogs or muffins"})

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)  # Save the file to the server
        

        img = image.load_img(filepath, target_size=(224, 224, 3)) # needs all three channels
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x /= 255 # normalize

        loaded_model = load_model("./model/muffindogs.h5")

        # make the prediction
        pred = loaded_model.predict(x)
        print(f"prediction is ", pred)
        print(type(pred))
    
        # remove the image from the service
        os.remove(filepath)

        # this is for the dog
        if pred[0, 1] > 0.5:
            return jsonify({"message" : f"ITS A DOG! With {pred[0, 1]:.2f}% probability"}) # 1 is dog
        else:
            return jsonify({"message": f"ITS A MUFFIN! With {pred[0, 0]:.2f}% probability"}) # 0 is muffin


    return jsonify({'message': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True)