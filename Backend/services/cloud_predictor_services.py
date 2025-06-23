from services.cloudinary_services import download_from_cloudinary
from config.model_config import model
from preprocess_utilities.cloud_classifier import CloudClassifier

# Load model once on import
classifier = CloudClassifier()
classifier.load_model(model())

# Function to classify an image from a Cloudinary URL
def classify_cloud_image(image_url):
    try:
        image_binary = download_from_cloudinary(image_url)
        return classifier.predict_from_binary(image_binary)
    except Exception as e:
        raise Exception(f"Prediction failed (services.cloud_predictor_services): {e}")
