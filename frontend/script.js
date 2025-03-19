async function getRecommendations() {
    const plantInput = document.getElementById('plantInput').value;
    const plantsToPlant = document.getElementById('plantsToPlant');
    const plantsToAvoid = document.getElementById('plantsToAvoid');
    const error = document.getElementById('error');

    // Clear previous results
    plantsToPlant.textContent = '';
    plantsToAvoid.textContent = '';
    error.textContent = '';

    if (!plantInput) {
        error.textContent = 'Please enter a plant name.';
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/recommend?plant=${plantInput}`);
        const data = await response.json();

        if (data.error) {
            error.textContent = data.error;
        } else {
            plantsToPlant.textContent = `Plants to plant with ${plantInput}: ${data.plants_to_plant.join(', ')}`;
            plantsToAvoid.textContent = `Plants to avoid with ${plantInput}: ${data.plants_to_avoid.join(', ')}`;
        }
    } catch (err) {
        error.textContent = 'An error occurred. Please try again.';
    }
}