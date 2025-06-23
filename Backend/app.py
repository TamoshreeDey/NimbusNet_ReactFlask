import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import warnings

# Suppress TensorFlow and other warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
warnings.filterwarnings('ignore')

# Load environment variables
load_dotenv()

# --- Import Blueprints ---
from routes.predict_route import prediction_bp
from routes.history_route import history_bp
from routes.upload_route import upload_bp  # ✅ Add this

# --- Initialize Flask app ---
app = Flask(__name__)
CORS(app)  # Allow frontend access (especially from React)

# --- Config ---
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-default-secret-key')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file upload

# --- Register Blueprints ---
app.register_blueprint(prediction_bp, url_prefix='/api')
app.register_blueprint(history_bp, url_prefix='/api')
app.register_blueprint(upload_bp, url_prefix='/api')  # ✅ Register upload route

# --- Health Check ---
@app.route('/', methods=['GET'])
def health_check():
    return {
        "status": "healthy",
        "message": "API is running successfully"
    }

# --- Error Handlers ---
@app.errorhandler(404)
def not_found(error):
    return {"error": "Endpoint not found"}, 404

@app.errorhandler(500)
def internal_error(error):
    return {"error": "Internal server error"}, 500

# --- Run App ---
if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    debug_mode = os.getenv("DEBUG", "True").lower() == "true"
    
    print(f"Starting server on port {port}")
    print(f"Debug mode: {debug_mode}")
    
    app.run(debug=debug_mode, port=port, host='0.0.0.0')
