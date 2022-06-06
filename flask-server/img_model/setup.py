import numpy as np
import sys
import os
from dotenv import load_dotenv
import cv2
from PIL import Image
from tensorflow.keras.models import load_model
from skimage.transform import resize
import matplotlib.pyplot as plt
import torch

load_dotenv()
Category = ["Apple", "Banana", "Kiwi", "Mango", "Orange", "Peach", "Pear", "Plastic_bag", "Tomatoes"]
print("loading Ingredient Detection Mdoel")
detection_model = torch.hub.load('ultralytics/yolov5', 'custom', path = os.environ.get("DETECTION_MODEL_PATH"))
print("loading Ingredient classification model")
classification_model = load_model(os.environ.get("CLASSIFICATION_MODEL_PATH"))

Category = ["Apple", "Banana", "Kiwi", "Mango", "Orange", "Peach", "Pear", "Plastic_bag", "Tomatoes"]
#test_img = cv2.imread("apple.jpg")
#print(type(test_img))
font = cv2.FONT_HERSHEY_PLAIN
# input : img == refregerator image
# return : startX, endX, startY, endY : Objects' Box Coordinates in Image
def Detection(img):
    #scr_img == Detection output (classes, consist of Object's **BOX Coordinate**, Crop Image, and many more)
    scr_img = detection_model(img)
    #Ingredient Box Coordinate in Image pandas array
    res = scr_img.pandas().xyxy[0]
    startX = []
    startY = []
    endX = []
    endY = []

    #put Each Coordinate in list
    for i in range(len(res)):
        startX.append(res.iloc[i]['xmin'])
        endX.append(res.iloc[i]['xmax'])
        startY.append(res.iloc[i]['ymin'])
        endY.append(res.iloc[i]['ymax'])
    
    return startX, endX, startY, endY


def Classification(image):
    img = np.array(image)
    res = resize(img,(224,224,3))
    res = np.expand_dims(res, axis = 0)
    out = classification_model.predict(res)
    return Category[np.argmax(out)]
