document.addEventListener("DOMContentLoaded", function () {
    // Add fading in effect while scrolling
    const elements = document.querySelectorAll('.fadeIn');

    const fadeIn = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(fadeIn, { rootMargin: '0px 0px -100px 0px' });

    elements.forEach(element => {
        observer.observe(element);
    });

    // Function to handle button clicks and redirect
    const handleButtonClick = (buttonId, destination) => {
        const button = document.getElementById(buttonId);
        
        if (button) {
            button.addEventListener('click', function() {
                window.location.href = destination;
            });
        }
    };

    const restaurants = ['Mang Inasar', 'Jollibonk', 'MCDODO', 'Chokeking', 'Pepper Brunch'];

    // Function to handle search button click
    const handleSearch = () => {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const matchingRestaurant = findMatchingRestaurant(searchTerm);

        if (matchingRestaurant) {
            console.log('Found matching restaurant:', matchingRestaurant);
            highlightMatchingRestaurant(matchingRestaurant, searchTerm);
        } else {
            console.log(`${searchTerm} is not available`);
            // Display a prompt or message to the user
            displayErrorMessage(`${searchTerm} is not available`);
        }
    };

    // Function to find a matching restaurant
    const findMatchingRestaurant = (searchTerm) => {
        return restaurants.find(restaurant => restaurant.toLowerCase().includes(searchTerm));
    };

    // Function to highlight the matching part of the restaurant name
    const highlightMatchingRestaurant = (restaurantName, searchTerm) => {
        const highlightedName = restaurantName.replace(new RegExp(`(${searchTerm})`, 'i'), '<span class="highlight">$1</span>');
        displayHighlightedName(highlightedName);
    };

    // Function to display the highlighted restaurant name
    const displayHighlightedName = (highlightedName) => {
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.innerHTML = highlightedName;
    };

    // Function to display an error message
    const displayErrorMessage = (message) => {
        const errorPrompt = document.getElementById('errorPrompt');
        errorPrompt.innerHTML = message;
        errorPrompt.style.color = 'red';
    };

    // Example usage for Mang Inasar button
    handleButtonClick('Resto1', './path/to/Resto1.html');
    handleButtonClick('Resto2', './path/to/Resto2.html');
    handleButtonClick('Resto3', './path/to/Resto3.html');
    handleButtonClick('Resto4', './path/to/Resto4.html');
    handleButtonClick('Resto5', './path/to/Resto5.html');

    // Add a click event listener to the search button
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
});

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