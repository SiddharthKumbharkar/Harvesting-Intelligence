console.log("welcome")
let signin = document.getElementById('signInLink');
let disease = document.getElementById('feature1');

signin.addEventListener('click', () => {
    window.location.href = 'login.html';
})

disease.addEventListener('click', () => {
    window.location.href = 'disease_detection.html';
})