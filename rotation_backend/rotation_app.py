from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load the crop rotation dataset
DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "crop_rotation_dataset.csv")

try:
    crop_data = pd.read_csv(DATA_PATH)
    print("✅ Crop rotation dataset loaded successfully.")
except Exception as e:
    print(f"❌ Error loading dataset: {e}")

@app.route('/get_rotation', methods=['GET'])
def get_crop_rotation():
    """Fetch recommended next crops based on user input, handling case sensitivity."""
    current_crop = request.args.get('crop', '').strip().capitalize()

    if not current_crop:
        return jsonify({"status": "error", "message": "No crop provided. Please enter a valid crop name."}), 400

    matching_crops = crop_data["Current Crop"].str.lower().tolist()
    
    if current_crop.lower() in matching_crops:
        result = crop_data[crop_data["Current Crop"].str.lower() == current_crop.lower()][["Recommended Next Crops", "Reason"]].to_dict(orient='records')
        return jsonify({"status": "success", "crop": current_crop, "recommendations": result})
    else:
        return jsonify({"status": "error", "message": f"'{current_crop}' not found in database"}), 404


if __name__ == '__main__':
    app.run(debug=True, port=5001)
