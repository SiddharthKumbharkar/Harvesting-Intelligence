console.log('Harvesting Intelligence website loaded.');
let signIn = document.getElementById('signin');
let cropselect = document.getElementById('crop-selection');
let yieldOp = document.getElementById('yield-optimisation');

// Sign In
signIn.addEventListener('click', () => {
    window.location.href = 'login.html';
})

// Yield optimisation
yieldOp.addEventListener('click', () => {
    window.location.href = 'yield_optimisation.html';
})

// Crop Selection
cropselect.addEventListener('click', function (){
    window.location.href = "http://127.0.0.1:3000/frontend/companion.html";
})

// Disease detection
function selectCrop(cropName){
    window.location.href =  `index_${cropName}.html`;
}