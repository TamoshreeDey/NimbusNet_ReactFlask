from preprocess_utilities.cloud_classifier import CloudClassifier
from services.cloudinary_services import download_from_cloudinary
from config.model_config import model

model_url=model()

# Step 1: Initialize the classifier
classifier = CloudClassifier()
classifier.load_model(model_url)  # Make sure the model file path is correct

# Step 2: Function to classify using Cloudinary image URL
def classify_cloud_image(image_url):
    try:
        # Download the image from Cloudinary
        image_binary = download_from_cloudinary(image_url)  # This should return bytes
        
        # Predict using the BAM model
        result = classifier.predict_from_binary(image_binary)
        
        # Output or return results
        print("Predicted Class:", result['predicted_class'])
        print("Confidence:", result['confidence_percentage'])
        return result
    
    except Exception as e:
        print(f"Error during classification (services.preprocess_unit): {e}")
        return {"error": str(e)}
