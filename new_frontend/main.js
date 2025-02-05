console.log('Harvesting Intelligence website loaded.');
let signIn = document.getElementById('signin');
let disease = document.getElementById('disease-detection');
let cropselect = document.getElementById('crop-selection');
let yieldOp = document.getElementById('yield-optimisation');

signIn.addEventListener('click', () => {
    window.location.href = 'login.html';
})

disease.addEventListener('click', () => {
    window.location.href = 'disease_detection.html';
})

yieldOp.addEventListener('click', () => {
    window.location.href = 'yield_optimisation.html';
})

cropselect.addEventListener('click', () => {
    window.location.href = 'crop_selection.html';
})