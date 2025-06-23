import os
from dotenv import load_dotenv

load_dotenv()

def model():
    try:
        model_url=os.getenv("MODEL_PATH")
        print("Loading BAM_CNN...")
        return model_url
    except Exception as e:
        print("Failed to load model")
        return None