from flask import Blueprint, request, jsonify
from services.cloud_predictor_services import classify_cloud_image

prediction_bp = Blueprint("prediction", __name__)

@prediction_bp.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    cloudinary_url = data.get("image_url")

    if not cloudinary_url:
        return jsonify({"error": "No image URL provided"}), 400

    try:
        # Classify using the Cloudinary URL
        result = classify_cloud_image(cloudinary_url)

        return jsonify({
            "image_url": cloudinary_url,
            "prediction": result
        })

    except Exception as e:
        return jsonify({"error (predict_route)": str(e)}), 500
