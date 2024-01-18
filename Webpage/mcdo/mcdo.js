function showPopup() {
    document.getElementById("popup-container").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closePopup() {
    document.getElementById("popup-container").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function redirectToMcDonalds() {
    // Replace the URL with the actual McDonald's Philippines website
    window.location.href = "https://www.mcdonalds.com.ph/";
}

// Remove the setTimeout function from the previous version
