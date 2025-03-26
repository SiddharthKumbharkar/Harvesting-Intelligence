async function getRecommendations() {
    const plantInput = document.getElementById('plantInput').value.trim();
    const recommendedCrops = document.getElementById('recommendedCrops');
    const reason = document.getElementById('reason');
    const error = document.getElementById('error');

    // Clear previous results
    recommendedCrops.textContent = '';
    reason.textContent = '';
    error.textContent = '';

    if (!plantInput) {
        error.textContent = 'Please enter a crop name.';
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5001/get_rotation?crop=${plantInput}`);
        const data = await response.json();

        if (data.status === "error") {
            error.textContent = data.message;
        } else {
            // Extract the first recommendation
            const recommendation = data.recommendations[0];

            if (recommendation) {
                recommendedCrops.textContent = `Recommended next crops after ${plantInput}: ${recommendation["Recommended Next Crops"]}`;
                reason.textContent = `Reason: ${recommendation["Reason"]}`;
            } else {
                error.textContent = "No recommendations found.";
            }
        }
    } catch (err) {
        error.textContent = 'An error occurred. Please try again.';
    }
}
