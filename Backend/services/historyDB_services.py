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
            query["timestamp"] = {}
            if from_date:
                from_dt = datetime.strptime(from_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
                query["timestamp"]["$gte"] = from_dt
            if to_date:
                # include the whole day by adding 1 day and using $lt
                to_dt = datetime.strptime(to_date, "%Y-%m-%d") + timedelta(days=1)
                to_dt = to_dt.replace(tzinfo=timezone.utc)
                query["timestamp"]["$lt"] = to_dt

            cursor = collection.find(query).sort("timestamp", -1)
        else:
            # Default: return latest 3 records if no date range is specified
            cursor = collection.find().sort("timestamp", -1).limit(3)

        results = []
        for doc in cursor:
            doc["_id"] = str(doc["_id"])  # Convert ObjectId to string
            doc["timestamp"] = doc["timestamp"].strftime('%a, %d %b %Y %H:%M:%S GMT')  # Optional readable format
            results.append(doc)

        return results

    except Exception as e:
        raise Exception(f"Failed to retrieve history: {e}")
