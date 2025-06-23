from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

def connect_to_mongo():
    try:
        mongo_uri = os.getenv("DB_URL")
        db_name = os.getenv("DB_NAME")
        collection_name = os.getenv("MONGODB_COLLECTION_NAME", "cloud_prediction")  # fallback default

        client = MongoClient(mongo_uri)
        db = client[db_name]
        collection = db[collection_name]

        print(f"MongoDB connected: Database = {db_name}, Collection = {collection_name}")
        return collection

    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        return None
