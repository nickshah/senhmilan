document.getElementById('imageLoader').addEventListener('change', handleImage, false);
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('nameLoader');
const downloadButton = document.getElementById('downloadButton');
const moveButton = document.getElementsByClassName("moveButton");

// URL for the frame image (replace with your frame image URL)
const frameUrl = 'frame2.png'; // Example placeholder URL, please use a real URL
const frameImage = new Image();
// frameImage.crossOrigin = 'Access-Control-Allow-Origin: *'; // Needed for CORS if image is on a different domain
canvas.width = 400;
canvas.height = 600;
let imageX = 0;
let imageY = 50;
const moveAmount = 5; // Pixels to move per update
frameImage.onload = () => {
    drawframe();
    // Once frame is loaded, it's ready to be used
};
frameImage.src = frameUrl;
let img = new Image();

function handleImage(e) {
    const reader = new FileReader();
    reader.onload = function (event) {
        img.onload = function () {
            // Set canvas size to match the uploaded image
            // canvas.width = img.width;
            // canvas.height = img.height;
            drawImageOnCanvas()
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

// Function to draw the image on the canvas
function drawImageOnCanvas() {
    // Draw the uploaded image first
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing
    ctx.drawImage(img, imageX, imageY, canvas.width, canvas.height);
    drawframe();
    drawText(); // Call drawText initially to display any existing input
    // Show the download button
    downloadButton.style.display = 'block';
    Array.from(moveButton).forEach(el => {
        el.style.display = 'inline-block';
    });
    
}

function drawframe() {
    // Draw the frame image on top, scaled to fit the canvas
    // Ensure frame image is loaded (handled by frameImage.onload in real use)
    if (frameImage.complete && frameImage.naturalHeight !== 0) {
        ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
    } else {
        console.warn("Frame image not loaded or invalid. Only original image drawn.");
        // Optional: Draw a simple border if frame image fails to load
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 10;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }
}

function drawText() {

    // Redraw the original image first to clear previous text
    if (img.src) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, imageX, imageY, canvas.width, canvas.height);
        drawframe();
    }

    const text = textInput.value;
    if (text) {
        // 3. Set the text properties
        ctx.font = "35pt Calibri"; // Set font size and family
        ctx.fillStyle = "black"; // Set text color
        ctx.textAlign = "center"; // Center the text horizontally
        ctx.textBaseline = "middle"; // Center the text vertically

        // 4. Draw the text (this is the top layer)
        var textToWrite = text;
        var x = canvas.width / 2;
        var y = canvas.height - 115;
        ctx.fillText(textToWrite, x, y); // Draw the filled text

        // Optional: Add an outline to the text
        // ctx.strokeStyle = 'black';
        // ctx.lineWidth = 1;
        // ctx.strokeText(textToWrite, x, y); // Draw the outlined text
    }
}

downloadButton.addEventListener('click', function () {
    // Convert the canvas content to a data URL
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    // Create a temporary link element for download
    const link = document.createElement('a');
    link.download = 'framed-image.png'; // Specify the download file name
    link.href = image;
    link.click(); // Simulate a click on the link to trigger download
    link.remove();
});

function moveImageRight() {
    // 1. Update the coordinates
    imageX += moveAmount;

    // Optional: Stop moving if it goes off canvas
    if (imageX > canvas.width) {
        imageX = -image.width; // Reset off-screen to loop
    }

    // 2. Redraw the scene with the new position
    drawImageOnCanvas();
}

function moveImageLeft() {
    // 1. Update the coordinates
    imageX -= moveAmount;

    // Optional: Stop moving if it goes off canvas
    if (imageX > canvas.width) {
        imageX = -image.width; // Reset off-screen to loop
    }

    // 2. Redraw the scene with the new position
    drawImageOnCanvas();
}

function moveImageUp() {
    // 1. Update the coordinates
    imageY -= moveAmount;

    // Optional: Stop moving if it goes off canvas
    if (imageY > canvas.height) {
        imageY = -image.height; // Reset off-screen to loop
    }

    // 2. Redraw the scene with the new position
    drawImageOnCanvas();
}

function moveImageDown() {
    // 1. Update the coordinates
    imageY += moveAmount;

    // Optional: Stop moving if it goes off canvas
    if (imageY > canvas.height) {
        imageY = -image.height; // Reset off-screen to loop
    }

    // 2. Redraw the scene with the new position
    drawImageOnCanvas();
}

