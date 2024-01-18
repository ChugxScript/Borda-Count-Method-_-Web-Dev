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


// borda
let candidates = [];
let votingStarted = false; // Flag to check if voting has started
let voteAgainBtnFlag = false

function renderCandidates() {
    const candidatesContainer = document.getElementById('candidates');
    candidatesContainer.innerHTML = '';

    // hide vote again button
    if (!voteAgainBtnFlag){
        document.getElementById('voteAgainID').style.display = 'none';
    } else{
        document.getElementById('voteAgainID').style.display = 'block';
    }

    // Enable the "Submit Vote" button if there are three or more candidates
    if (candidates.length >= 3) {
        document.getElementById('startVoteBtn').disabled = false;
    } else{
        document.getElementById('startVoteBtn').disabled = true;
    }

    // hide submit vote button while votingStarted = false
    if (!votingStarted){
        document.getElementById('submitVoteID').style.display = 'none';
    } else{
        document.getElementById('submitVoteID').style.display = 'block';
    }

    // Enable the "Submit Vote" button if there are three or more candidates and all candidates are ranked
    const submitVoteBtn = document.getElementById('submitVoteID');
    submitVoteBtn.disabled = !(candidates.length >= 3 && allCandidatesRanked());

    // Create a table element
    const table = document.createElement('table');
    table.classList.add('candidates-table');

    // Create a table header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = votingStarted
        ? '<th>Candidates</th><th>Rank</th>'
        : '<th>Candidates</th><th>Delete</th>';
    table.appendChild(headerRow);

    // Create rows for each candidate
    candidates.forEach((candidate, index) => {
        const row = document.createElement('tr');

        if (votingStarted) {
            // Display ranking if voting has started
            const rankDisplayCell = `<td class="rank-cell">${candidate.rank}</td>`;
            row.innerHTML = `
                <td onclick="toggleCandidate(${index})">${candidate.name}</td>
                ${rankDisplayCell}
            `;
        } else {
            // Display 'x' button when not voting
            const deleteButtonCell = `<td><button onclick="deleteCandidate(${index})">X</button></td>`;
            row.innerHTML = `
                <td>${candidate.name}</td>
                ${deleteButtonCell}
            `;
        }

        // Highlight selected candidates during voting
        if (votingStarted && candidate.rank > 0) {
            row.classList.add('selected');
        }

        table.appendChild(row);
    });

    // Append the table to the container
    candidatesContainer.appendChild(table);
}

function allCandidatesRanked() {
    return candidates.every(candidate => candidate.rank > 0);
}

function toggleCandidate(index) {
    if (votingStarted) {
        const candidate = candidates[index];
        if (candidate.rank === 0) {
            // If not ranked, assign a rank and highlight
            candidate.rank = getAvailableRank();
            candidate.selected = true;
        } else {
            // If already ranked, unhighlight and remove rank
            candidate.rank = 0;
            candidate.selected = false;
        }

        renderCandidates();
        updateSubmitButtonState();
    }
}

function getAvailableRank() {
    // Find the lowest available rank (not used by any candidate)
    for (let i = 1; i <= candidates.length; i++) {
        const rankUsed = candidates.some(candidate => candidate.rank === i);
        if (!rankUsed) {
            return i;
        }
    }
    // If all ranks are used, return 0 (unranked)
    return 0;
}

function updateSubmitButtonState() {
    const submitVoteBtn = document.getElementById('submitVoteBtn');
    const allCandidatesRanked = candidates.every(candidate => candidate.rank > 0);
    submitVoteBtn.disabled = !allCandidatesRanked;
}


function addCandidate() {
    const newCandidateInput = document.getElementById("newCandidate");
    const candidateName = newCandidateInput.value.trim();

    if (candidateName) {
        candidates.push({ name: candidateName, points: 0, rank: 0, selected: false });
        renderCandidates();
        newCandidateInput.value = "";
        
    } else {
        alert("Please enter a valid candidate name.");
    }
}


function deleteCandidate(index) {
    candidates.splice(index, 1);
    renderCandidates();
}

function startVoting() {
    // Hide elements
    document.getElementById('newCandidate').style.display = 'none';
    document.getElementById('addCandidateBtn').style.display = 'none';
    document.getElementById('startVoteBtn').style.display = 'none';

    // Start voting
    votingStarted = true;
    renderCandidates();
}

function vote(candidateName) {
    const candidate = candidates.find(c => c.name === candidateName);

    // Toggle selected state
    candidate.selected = !candidate.selected;

    // Update rankings
    let rank = 0;
    candidates.filter(c => c.selected).forEach((c, index) => {
        c.rank = index + 1;
        rank = c.rank;
    });

    // Enable/Disable submit vote button based on selection
    const submitVoteBtn = document.getElementById('submitVoteBtn');
    submitVoteBtn.disabled = rank === 0;

    renderCandidates();
}

function submitVote() {
    // Hide the "Submit Vote" button
    document.getElementById('candidates').style.display = 'none';

    // Hide the table containing the candidates
    document.getElementById('submitVoteID').style.display = 'none';

    document.getElementById('results').style.display = 'block';

    // Calculate points for each candidate based on their rank
    candidates.forEach(candidate => {
        // For simplicity, you can adjust the points calculation based on your specific Borda Count method
        // For example, you might assign candidates n points for being ranked 1st, n-1 for 2nd, and so on
        candidate.points = Math.max(0, candidates.length - candidate.rank);
    });

    // Sort candidates by points in descending order
    candidates.sort((a, b) => b.points - a.points);

    // Display the results in a table
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    // Create the result table
    const resultTable = document.createElement('table');
    resultTable.classList.add('results-table');

    // Create the winner row
    const winnerRow = document.createElement('tr');
    const winnerCell = document.createElement('td');
    winnerCell.colSpan = 2; // Span both columns

    // Apply styles
    winnerCell.style.fontSize = '50px'; // Adjust the font size
    winnerCell.style.textAlign = 'center'; // Center the text
    winnerCell.style.fontWeight = 'bold'; // Make the text bold

    winnerCell.textContent = 'WINNER';
    winnerRow.appendChild(winnerCell);
    resultTable.appendChild(winnerRow);

    // Create the candidate name row
    const nameRow = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.colSpan = 2; // Span both columns

    // Apply styles
    nameCell.style.fontSize = '25px'; // Adjust the font size
    nameCell.style.textAlign = 'center'; // Center the text
    nameCell.style.fontWeight = 'bold'; // Make the text bold

    nameCell.textContent = candidates[0].name; // Assuming the first candidate is the winner
    nameRow.appendChild(nameCell);
    resultTable.appendChild(nameRow);


    // Create the header row for the detailed results
    const headerRow = document.createElement('tr');
    const candidateHeader = document.createElement('th');
    candidateHeader.textContent = 'Candidate';
    const scoreHeader = document.createElement('th');
    scoreHeader.textContent = 'Score';
    headerRow.appendChild(candidateHeader);
    headerRow.appendChild(scoreHeader);
    resultTable.appendChild(headerRow);

    // Create rows for each candidate
    candidates.forEach(candidate => {
        const row = document.createElement('tr');
        const candidateCell = document.createElement('td');
        const scoreCell = document.createElement('td');
        candidateCell.textContent = candidate.name;
        scoreCell.textContent = candidate.points;
        row.appendChild(candidateCell);
        row.appendChild(scoreCell);
        resultTable.appendChild(row);
    });

    // Append the result table to the container
    resultsContainer.appendChild(resultTable);

    voteAgainBtnFlag = true;
    document.getElementById('voteAgainID').style.display = 'block';
}

function voteAgain() {
    // Reset the voting process
    candidates.forEach(candidate => {
        candidate.rank = 0;
        candidate.selected = false;
    });

    // Show the table containing the candidates
    document.getElementById('candidates').style.display = 'block';
    // Show the "Submit Vote" button
    document.getElementById('newCandidate').style.display = 'inline-block';
    document.getElementById('addCandidateBtn').style.display = 'inline-block';
    document.getElementById('startVoteBtn').style.display = 'inline-block';

    // Hide the "Vote Again" button
    document.getElementById('voteAgainID').style.display = 'none';
    document.getElementById('results').style.display = 'none';

    voteAgainBtnFlag = false;
    votingStarted = false;

    // Re-render the candidates
    renderCandidates();
}

// Initial rendering
renderCandidates();
