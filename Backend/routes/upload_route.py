from flask import Blueprint, request, jsonify
from services.cloudinary_services import cloudinary_uploads

upload_bp = Blueprint("upload", __name__)

@upload_bp.route("/upload", methods=["POST"])
def upload():
    file = request.files.get("image")
    if not file:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        # Upload image to Cloudinary
        cloudinary_url = cloudinary_uploads(file)
        return jsonify({"image_url": cloudinary_url})

    except Exception as e:
        return jsonify({"error (upload_route)": str(e)}), 500
