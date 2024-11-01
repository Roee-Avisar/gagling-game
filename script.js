const video = document.getElementById('video');
const canvas = document.getElementById('overlay');
const context = canvas.getContext('2d');
let counter = 0;
const counterDiv = document.getElementById('counter');
const slider = document.getElementById('line-height-slider');
const lineColorPicker = document.getElementById('line-color');
let ballDetected = false;
const resetButton = document.getElementById('resetButton'); // Get the reset button

// Access the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing camera:", err);
    });

// Draw the line and process the video
function processVideo() {
    if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.clearRect(0, 0, canvas.width, canvas.height);

        // First, draw the video frame
        context.save(); // Save the current context state
        context.scale(-1, 1); // Flip the context horizontally
        context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height); // Draw the video flipped
        context.restore(); // Restore the context to its original state

        // Get the line height from the slider
        const lineY = canvas.height * (slider.value / 100);
        const lineColor = lineColorPicker.value;

        // Draw the line on top of the video frame
        context.beginPath();
        context.moveTo(0, lineY);
        context.lineTo(canvas.width, lineY);
        context.strokeStyle = lineColor;
        context.lineWidth = 4;
        context.stroke();

        // Extract image data to find the ball
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // Find yellow ball in the image
        const ballPosition = findYellowAndRedBall(imageData);
        if (ballPosition) {
            // Highlight the ball with a green rectangle
            context.strokeStyle = 'green';
            context.lineWidth = 3;
            context.strokeRect(ballPosition.x - 10, ballPosition.y - 10, 20, 20);

            // Ball crossing the line logic
            if (ballPosition.y < lineY && !ballDetected) { // Count when above the line
                counter++;
                counterDiv.innerText = `Counter: ${counter}`;
                ballDetected = true; // Set to true when the ball is detected above the line
            } else if (ballPosition.y >= lineY) { // Reset detection state when below the line
                ballDetected = false; 
            }
        }
    }

    // Continue the loop
    requestAnimationFrame(processVideo);
}

// Function to detect yellow-colored ball
function findYellowAndRedBall(imageData) {
    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];

        // Check for pure red (R is high, G and B are low)
        if (r >= 170 && g <= 20 && b <= 40) {
            const x = (i / 4) % canvas.width;
            const y = Math.floor((i / 4) / canvas.width);
            return { x, y, color: 'red' }; // Indicate that the detected ball is red
        }

        // Check for pure yellow (R and G are high, B is low)
        if (r >= 180 && g >= 180 && b <= 70) {
            const x = (i / 4) % canvas.width;
            const y = Math.floor((i / 4) / canvas.width);
            return { x, y, color: 'yellow' }; // Indicate that the detected ball is yellow
        }
    }
    return null;
}

// Start processing video when video is playing
video.addEventListener('play', processVideo);

// Reset the counter and update the counter display
function resetCounter() {
    counter = 0;
    counterDiv.innerText = `Counter: ${counter}`;
    ballDetected = false;  // Reset the detection state
}

// Add event listener to the reset button
resetButton.addEventListener('click', resetCounter);
