import requests
from PIL import Image
from io import BytesIO
import cloudinary.uploader
import numpy as np
import tensorflow as tf

import config.cloudinary_config

def cloudinary_uploads(file):
    result = cloudinary.uploader.upload(file)
    return result["secure_url"]

def download_from_cloudinary(image_url):
    """Download and return an image as a batched (1, 256, 256, 3) uint8 array"""
    response = requests.get(image_url)
    response.raise_for_status()

    image = Image.open(BytesIO(response.content)).convert("RGB")
    image = image.resize((256, 256))
    image_array = np.array(image, dtype=np.uint8)

    # Add batch dimension: (256, 256, 3) → (1, 256, 256, 3)
    return np.expand_dims(image_array, axis=0)