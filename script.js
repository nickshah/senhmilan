document.getElementById('imageLoader').addEventListener('change', handleImage, false);
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const downloadButton = document.getElementById('downloadButton');

// URL for the frame image (replace with your frame image URL)
const frameUrl = 'frame.png'; // Example placeholder URL, please use a real URL
const frameImage = new Image();
// frameImage.crossOrigin = 'Access-Control-Allow-Origin: *'; // Needed for CORS if image is on a different domain

frameImage.onload = () => {
    // Once frame is loaded, it's ready to be used
};
frameImage.src = frameUrl;

function handleImage(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            // Set canvas size to match the uploaded image
            // canvas.width = img.width;
            // canvas.height = img.height;
            canvas.width = 200;
            canvas.height = 300;

            // Draw the uploaded image first
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

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
            
            // Show the download button
            downloadButton.style.display = 'block';
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

downloadButton.addEventListener('click', function() {
    // Convert the canvas content to a data URL
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    
    // Create a temporary link element for download
    const link = document.createElement('a');
    link.download = 'framed-image.png'; // Specify the download file name
    link.href = image;
    link.click(); // Simulate a click on the link to trigger download
    link.remove();
});
