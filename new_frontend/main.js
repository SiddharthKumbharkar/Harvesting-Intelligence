console.log('Harvesting Intelligence website loaded.');

let signIn = document.getElementById('signin');
let cropselect = document.getElementById('crop-selection');
let yieldOp = document.getElementById('yield-optimisation');

// Sign In
signIn.addEventListener('click', () => {
    window.location.href = 'login.html';
});

// Yield optimisation
yieldOp.addEventListener('click', () => {
    window.location.href = 'yield_optimisation.html';
});

// Crop Selection
cropselect.addEventListener('click', () => {
    window.location.href = 'crop_selection.html';
});

// Disease detection
function selectCrop(cropName) {
    window.location.href = `index_${cropName}.html`;
}

// 🟢 SIGNUP FORM LOGIC
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("authForm");

    if (signupForm) {
        signupForm.addEventListener("submit", async function (e) {
            e.preventDefault(); // Prevents page reload

            const userData = {
                name: document.getElementById("signupUsername").value,
                email: document.getElementById("signupEmail").value,
                password: document.getElementById("signupPassword").value,
                //role: document.getElementById("role").value
            };
            console.log("User Data Before Sending:", userData);
            try {
                const response = await fetch("http://localhost:5000/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData)
                });

                const data = await response.json();
                console.log("Response from Backend:", result);

                if (response.ok) {
                    alert("Signup successful! Redirecting to login page...");
                    window.location.href = "login.html"; // Redirect to login page after signup
                } else {
                    alert(data.message || "Signup failed! Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Signup failed! Check console for errors.");
            }
        });
    }

    // 🟢 LOGIN FORM LOGIC (NEWLY ADDED)
    const loginForm = document.querySelector("#signInContainer form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent default form submission

            const email = document.getElementById("signinEmail").value;
            const password = document.getElementById("signinPassword").value;

            try {
                const response = await fetch("http://localhost:5000/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Login successful, token:", data.token);

                    // Store token in localStorage
                    localStorage.setItem("token", data.token);

                    // Redirect to dashboard (change as needed)
                    window.location.href = "index.html";
                } else {
                    alert(data.message || "Login failed. Check credentials.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            }
        });
    }
});
