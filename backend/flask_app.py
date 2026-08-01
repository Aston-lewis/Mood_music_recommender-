import base64
import cv2
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from deepface import DeepFace

app = Flask(__name__)
# Enable CORS so the React app running on port 5173 can access this API
CORS(app)

# Load songs dataset
songs_df = pd.read_csv("songs.csv")

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "AI Mood Music Recommender API is running"}), 200

@app.route("/detect-emotion", methods=["POST"])
def detect_emotion():
    try:
        # Get base64 string from JSON request
        data = request.json
        if not data or "image" not in data:
            return jsonify({"error": "No image data provided"}), 400
            
        image_data = data["image"]
        
        # Strip header (e.g. "data:image/jpeg;base64,") if present
        if "," in image_data:
            header, image_data = image_data.split(",", 1)
            
        # Decode base64 bytes to image array
        decoded_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(decoded_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            return jsonify({"error": "Failed to decode image"}), 400
            
        # Analyze emotion using DeepFace
        result = DeepFace.analyze(
            img,
            actions=['emotion'],
            enforce_detection=True,  # Throw error if no face is found
            detector_backend='opencv'
        )
        
        # Handle list vs dictionary response from DeepFace
        face_data = result[0] if isinstance(result, list) else result
        
        # No face check
        if face_data.get('face_confidence', 1) == 0:
            return jsonify({"error": "No face detected"}), 400
            
        emotion = face_data['dominant_emotion'].lower()
        print(f"Detected Emotion: {emotion}")
        
        # Match songs based on emotion
        filtered_songs = songs_df[songs_df['mood'].str.lower() == emotion]
        
        if filtered_songs.empty:
            return jsonify({
                "emotion": emotion,
                "song": "No specific track matched",
                "artist": "Various Artists",
                "spotify_track_id": "0VjIjW4GlUZAMYd2vXMi3b" # Fallback link
            })
            
        # Select random recommended song
        recommended = filtered_songs.sample(1).iloc[0]
        
        # Extract Spotify Track ID from the CSV link
        spotify_link = recommended['spotify_link']
        track_id = "0VjIjW4GlUZAMYd2vXMi3b" # Default fallback
        if "track/" in spotify_link:
            track_id = spotify_link.split("track/")[-1].split("?")[0]
            
        return jsonify({
            "emotion": emotion,
            "song": recommended['song'],
            "artist": recommended['artist'],
            "spotify_track_id": track_id
        })

    except Exception as e:
        print(f"Error during detection: {e}")
        # Return 400 for face-not-found so the frontend can catch it and display the "No Face Detected" card
        if "Face could not be detected" in str(e):
            return jsonify({"error": "No face detected"}), 400
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("Starting Flask server on http://127.0.0.1:5000...")
    app.run(host="0.0.0.0", port=5000, debug=True)
