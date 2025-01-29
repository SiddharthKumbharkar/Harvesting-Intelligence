console.log("welcome")
let signin = document.getElementById('signInLink');
let disease = document.getElementById('feature1');
let yieldOp = document.getElementById('feature2');
let cropSelection = document.getElementById('feature3');

signin.addEventListener('click', () => {
    window.location.href = 'login.html';
})

disease.addEventListener('click', () => {
    window.location.href = 'disease_detection.html';
})

yieldOp.addEventListener('click', () => {
    window.location.href = 'yield_optimization.html';
})

cropSelection.addEventListener('click', () => {
    window.location.href = 'crop_selection.html';
})