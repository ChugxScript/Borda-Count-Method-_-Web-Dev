let restaurants = ['Mang Inasar', 'Jollibonk', 'MCDODO', 'Chokeking', 'Pepper Brunch'];

function handleSearch() {
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('errorPrompt').style.display = 'none';

    const searchTerm = document.getElementById('searchText').value.toLowerCase();
    const matchingRestaurant = findMatchingRestaurant(searchTerm);

    if (matchingRestaurant) {
        console.log('Found matching restaurant:', matchingRestaurant);
        highlightMatchingRestaurant(matchingRestaurant, searchTerm);
    } else {
        console.log(`${searchTerm} is not available`);
        displayErrorMessage(`${searchTerm} is not available`);
    }
}

function findMatchingRestaurant(searchTerm) {
    return restaurants.find(restaurant => restaurant.toLowerCase().includes(searchTerm));
}

function highlightMatchingRestaurant(matchingRestaurant, searchTerm) {
    const elements = document.querySelectorAll('.restaurant-name');

    elements.forEach(element => {
        const restaurantName = element.textContent.toLowerCase();

        if (restaurantName.includes(searchTerm)) {
            element.classList.add('highlighted'); // Add a class for highlighting
            setTimeout(() => {
                element.classList.remove('highlighted'); // Remove the class after a delay
            }, 3000); // Adjust the delay as needed
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

function displayHighlightedName(highlightedName) {
    document.getElementById('resultContainer').style.display = 'block';
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = highlightedName;
}

function displayErrorMessage(message) {
    document.getElementById('errorPrompt').style.display = 'block';
    const errorPrompt = document.getElementById('errorPrompt');
    errorPrompt.innerHTML = message;
    errorPrompt.style.color = 'red';
}

function redirectHTML(path) {
    // Redirect to the specified HTML page
    window.location.href = path;
}
