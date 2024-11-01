# Juggling Game

**Description:**
This Juggling Game allows users to track the number of times a ball (yellow or red) crosses a designated line. The app uses the camera to detect the ball's position and count each time it passes the adjustable line, making it easy to keep score.

## Features

- Real-time color detection of the ball (yellow or red) using a camera feed
- Adjustable line height and color for customized gameplay
- Score counter that increments every time the ball crosses the set line
- Reset button to clear the score and start a new round

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/juggling-game.git
2. Open juggling_game.html in a browser to start playing.

**How to Play**

1. Open the app in a browser that supports camera access.

2. Adjust the line height and color using the controls.

3. Start juggling the ball in front of your camera.

4. Watch the counter increase each time the ball crosses the line.

5. Use the reset button to restart the counter when needed.


**Code Overview**
- HTML (juggling_game.html):
  
  Sets up the main structure of the game, including the video feed, canvas overlay, counter display, reset button, and controls.
  
- CSS (styles.css):
  
  Styles the game layout, positioning the video, canvas, counter, and controls for easy access and readability.
  
- JavaScript (script.js):
  
  Initializes the camera feed and renders it to the canvas.
  Detects the position of the ball by analyzing pixel colors.
  Tracks when the ball crosses the line, updating the counter accordingly.
  Provides a reset function to clear the score and start over.
  
**Dependencies**

A compatible web browser with camera access permissions enabled.
