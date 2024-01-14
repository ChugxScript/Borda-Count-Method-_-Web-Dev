let candidates = [];

function renderCandidates() {
    const candidatesContainer = document.getElementById('candidates');
    candidatesContainer.innerHTML = '';

    candidates.forEach((candidate, index) => {
        const candidateDiv = document.createElement('div');
        candidateDiv.classList.add('candidate');
        candidateDiv.innerHTML = `
            <span>${candidate.name}</span>
            <input type="number" min="0" placeholder="Points" onchange="updatePoints('${candidate.name}', this.value)">
        `;
        candidatesContainer.appendChild(candidateDiv);
    });
}

function addCandidate() {
    const candidateName = prompt('Enter the candidate\'s name:');
    if (candidateName) {
        candidates.push({ name: candidateName, points: 0 });
        renderCandidates();
    }
}

function updatePoints(candidateName, points) {
    const candidate = candidates.find(c => c.name === candidateName);
    if (candidate) {
        candidate.points = parseInt(points) || 0;
    }
}

function calculateBordaCount() {
    candidates.sort((a, b) => b.points - a.points);

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    candidates.forEach((candidate, index) => {
        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = `<p>${index + 1}. ${candidate.name}: ${candidate.points} points</p>`;
        resultsContainer.appendChild(resultDiv);
    });
}

// Initial rendering
renderCandidates();
