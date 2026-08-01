from deepface import DeepFace
import cv2
import pandas as pd
import webbrowser
import time

# Load songs dataset
songs_df = pd.read_csv("songs.csv")

# Open webcam
cap = cv2.VideoCapture(0)

print("Press R to detect mood and recommend song")
print("Press Q to quit")

# Variables
current_song = ""
current_artist = ""
current_emotion = ""

# Store recently played songs
recent_songs = []

while True:

    ret, frame = cap.read()

    if not ret:
        print("Failed to access webcam")
        break

    # Flip camera for mirror effect
    frame = cv2.flip(frame, 1)

    # Display current emotion
    cv2.putText(
        frame,
        f"Emotion: {current_emotion}",
        (20, 50),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2
    )

    # Display current song
    cv2.putText(
        frame,
        f"{current_song} - {current_artist}",
        (20, 100),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.7,
        (255, 255, 255),
        2
    )

    # Show webcam
    cv2.imshow("Mood Music Recommender", frame)

    # Keyboard input
    key = cv2.waitKey(1) & 0xFF

    # Detect emotion when R is pressed
    if key == ord('r'):

        try:
            print("Detecting emotion...")

            # Use a clean frame copy
            img = frame.copy()

            # Analyze emotion
            result = DeepFace.analyze(
                img,
                actions=['emotion'],
                enforce_detection=False,
                detector_backend='opencv'
            )

            # Handle DeepFace result
            if isinstance(result, list):
                face_data = result[0]
            else:
                face_data = result

            # No face detected
            if face_data.get('face_confidence', 1) == 0:
                print("No face detected.")
                current_emotion = "No face found"
                continue

            # Get emotion
            emotion = face_data['dominant_emotion'].lower()
            current_emotion = emotion

            print(f"\nDetected Emotion: {emotion}")

            # Match songs based on emotion
            filtered_songs = songs_df[
                songs_df['mood'].str.lower() == emotion
            ]

            # If songs exist
            if not filtered_songs.empty:

                # Remove recently played songs
                available_songs = filtered_songs[
                    ~filtered_songs['song'].isin(recent_songs)
                ]

                # Reset if all songs used recently
                if available_songs.empty:
                    recent_songs.clear()
                    available_songs = filtered_songs

                # Pick random song
                recommended_song = available_songs.sample(1).iloc[0]

                current_song = recommended_song['song']
                current_artist = recommended_song['artist']
                spotify_link = recommended_song['spotify_link']

                # Track recent songs
                recent_songs.append(current_song)

                if len(recent_songs) > 2:
                    recent_songs.pop(0)

                print(f"Recommended Song: {current_song}")
                print(f"Artist: {current_artist}")
                print(f"Opening in 3 seconds...")

                # Show live updated frame for 3 seconds
                start_time = time.time()

                while time.time() - start_time < 3:

                    ret, temp_frame = cap.read()

                    if not ret:
                        break

                    temp_frame = cv2.flip(temp_frame, 1)

                    # Emotion text
                    cv2.putText(
                        temp_frame,
                        f"Emotion: {current_emotion}",
                        (20, 50),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        1,
                        (0, 255, 0),
                        2
                    )

                    # Song text
                    cv2.putText(
                        temp_frame,
                        f"{current_song} - {current_artist}",
                        (20, 100),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.7,
                        (255, 255, 255),
                        2
                    )

                    # Spotify countdown text
                    cv2.putText(
                        temp_frame,
                        "Opening Spotify in 3s...",
                        (20, 150),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.6,
                        (0, 200, 255),
                        2
                    )

                    cv2.imshow("Mood Music Recommender", temp_frame)

                    # Allow quitting during countdown
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        break

                # Open Spotify
                webbrowser.open(spotify_link, new=2)

            else:
                print(f"No songs found for emotion: {emotion}")
                current_emotion = f"{emotion} (no songs)"

        except Exception as e:
            print(f"Error during detection: {e}")

    # Quit program
    if key == ord('q'):
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()