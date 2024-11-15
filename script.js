// URLs of the PDF files to download
const pdfUrl1 = "./1CR21CS091 RESULT.pdf"; // File for USN "1CR21CS091"
const pdfUrl2 = "./1CR21EC240 RESULT.pdf"; // File for USN "1CR21EC240"
let captchaText = ''; // Store the generated CAPTCHA text
let selectedPdfUrl = ''; // Store the selected PDF URL based on the USN

// Function to generate a random CAPTCHA code and display it on the canvas
function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    captchaText = '';
    for (let i = 0; i < 6; i++) {
        captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const canvas = document.getElementById("captchaCanvas");
    const ctx = canvas.getContext("2d");

    // Clear the canvas before drawing new CAPTCHA
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add background color for the CAPTCHA
    ctx.fillStyle = "#f3f3f3";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add random lines to the background for noise
    for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(0, 0, 0, ${Math.random()})`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }

    // Set CAPTCHA text style
    ctx.font = "24px Arial";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw CAPTCHA text with slight rotation and random positioning for each character
    for (let i = 0; i < captchaText.length; i++) {
        const x = 20 + i * 16;
        const y = 20 + (Math.random() - 0.5) * 8;
        const angle = (Math.random() - 0.5) * 0.3;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillText(captchaText[i], 0, 0);
        ctx.restore();
    }
}

// Function to validate the USN format and select the PDF file based on USN
function validateUSN() {
    const usnInput = document.getElementById("usn").value;

    // Check if the entered USN matches specific values and select the appropriate PDF
    if (usnInput === "1CR21CS091") {
        selectedPdfUrl = pdfUrl1; // File for USN "1CR21CS091"
    } else if (usnInput === "1CR21EC240") {
        selectedPdfUrl = pdfUrl2; // File for USN "1CR21EC240"
    } else {
        alert("Result for this USN is not available.");
        return false;
    }
    return true;
}

// Function to validate the CAPTCHA input
function validateCaptcha() {
    const userInput = document.getElementById("captchaInput").value;
    if (userInput === captchaText) {
        return true;
    } else {
        alert("Invalid CAPTCHA. Please try again.");
        generateCaptcha(); // Regenerate CAPTCHA if validation fails
        return false;
    }
}

// Function to download the selected PDF file
function downloadPDF() {
    const link = document.createElement("a");
    link.href = selectedPdfUrl;
    link.setAttribute("download", selectedPdfUrl.split("/").pop()); // Set the download attribute with the file name
    link.setAttribute("type", "application/pdf"); // Set type to application/pdf
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the DOM
}

// Attach the validation functions to form submission
document.getElementById("result-form").onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission
    if (validateUSN() && validateCaptcha()) {
        // Download the PDF if both USN and CAPTCHA are valid
        downloadPDF();
    }
};

// Generate a new CAPTCHA code on page load
window.onload = generateCaptcha;
