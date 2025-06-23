from datetime import datetime, timezone, timedelta

def save_history(collection, image_url, prediction, report):
    if not all([image_url, prediction, report]):
        raise ValueError("Missing one or more required fields")
    
    # Validate that prediction is a dictionary
    if not isinstance(prediction, dict) or \
       "predicted_class" not in prediction or \
       "confidence_percentage" not in prediction:
        raise ValueError("Invalid prediction format")
    
    document = {
        "image_url": image_url,
        "prediction": {
            "predicted_class": prediction["predicted_class"],
            "confidence_percentage": prediction["confidence_percentage"]
        },
        "report": report,
        "timestamp": datetime.now(timezone.utc)  # Fixed deprecated utcnow()
    }
    
    result = collection.insert_one(document)
    return str(result.inserted_id)  # Convert to string for consistency

# Fetch history Services
def get_history(collection, from_date=None, to_date=None):
    try:
        query = {}

        if from_date or to_date:
            query['timestamp'] = {}
            if from_date:
                query['timestamp']['$gte'] = datetime.strptime(from_date, "%Y-%m-%d")
            if to_date:
                query['timestamp']['$lte'] = datetime.strptime(to_date, "%Y-%m-%d")
        else:
            # Default: last 10 days
            ten_days_ago = datetime.now() - timedelta(days=10)
            query['timestamp'] = {"$gte": ten_days_ago}

        cursor = collection.find(query).sort("timestamp", -1)
        results = []
        for doc in cursor:
            doc["_id"] = str(doc["_id"])  # Convert ObjectId to string
            results.append(doc)
        return results

    except Exception as e:
        raise Exception(f"Failed to retrieve history: {e}")