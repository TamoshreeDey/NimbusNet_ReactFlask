from flask import Blueprint, request, jsonify
from config.mongo_config import connect_to_mongo
from services.historyDB_services import save_history, get_history

history_bp = Blueprint("history", __name__)
collection = connect_to_mongo()

@history_bp.route("/history", methods=["POST"])
def post_history():
    if collection is None:
        return jsonify({"error": "Database not connected"}), 500

    try:
        data = request.get_json()

        image_url = data.get("image_url")
        prediction = data.get("prediction")  # should be a dict
        report = data.get("report")

        inserted_id = save_history(collection, image_url, prediction, report)

        return jsonify({
            "message": "History saved",
            "id": str(inserted_id)
        }), 201

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"Failed to save history: {str(e)}"}), 500
    
    
# Method to get history from frontend

@history_bp.route("/history", methods=["GET"])
def fetch_history():
    if collection is None:
        return jsonify({"error": "Database not connected"}), 500
    try:
        from_date = request.args.get("from")
        to_date = request.args.get("to")

        history_data = get_history(collection, from_date, to_date)
        return jsonify({"history": history_data}), 200
    except Exception as e:
        return jsonify({"error (history_route)": str(e)}), 500
