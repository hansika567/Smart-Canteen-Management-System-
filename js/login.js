/**
 * Login & Sign Up Form Handler - Canteen Management System
 * 
 * Performs:
 * 1. Auth toggle switching (Login/Sign Up)
 * 2. Basic form validation (Email check, length checks, password matches)
 * 3. Save details to localStorage and Redirect to dashboard
 */

/**
 * Switch form active tabs
 */
function switchAuthMode(mode) {
    const errorBanner = document.getElementById("auth-error-message");
    errorBanner.style.display = "none";

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const loginBtn = document.getElementById("toggle-login-btn");
    const signupBtn = document.getElementById("toggle-signup-btn");

    if (mode === "login") {
        loginForm.style.display = "flex";
        signupForm.style.display = "none";
        loginBtn.classList.add("active");
        signupBtn.classList.remove("active");
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "flex";
        loginBtn.classList.remove("active");
        signupBtn.classList.add("active");
    }
}

/**
 * Handle Login Validation
 */
function handleLogin(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById("login-email").value.trim();
    const passwordInput = document.getElementById("login-password").value;
    const errorBanner = document.getElementById("auth-error-message");

    errorBanner.style.display = "none";

    // 1. Basic empty check
    if (emailInput === "" || passwordInput === "") {
        showAuthError("Please fill in all fields.");
        return;
    }
    
    // 2. Simple email syntax verification
    if (!emailInput.includes("@") || !emailInput.includes(".")) {
        showAuthError("Please enter a valid email address.");
        return;
    }

    // 3. Minimum password length
    if (passwordInput.length < 6) {
        showAuthError("Password must be at least 6 characters long.");
        return;
    }

    // 4. Extract display name and save session info in localStorage
    const namePart = emailInput.split("@")[0];
    const username = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    localStorage.setItem("username", username);
    localStorage.setItem("email", emailInput);
    localStorage.setItem("isLoggedIn", "true");

    // Redirect to Main Dashboard screen
    window.location.href = "dashboard.html";
}

/**
 * Handle Sign Up Validation
 */
function handleSignUp(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("signup-username").value.trim();
    const emailInput = document.getElementById("signup-email").value.trim();
    const passwordInput = document.getElementById("signup-password").value;
    const confirmPasswordInput = document.getElementById("signup-confirm-password").value;
    const errorBanner = document.getElementById("auth-error-message");

    errorBanner.style.display = "none";

    // 1. Basic validation checks
    if (usernameInput === "" || emailInput === "" || passwordInput === "" || confirmPasswordInput === "") {
        showAuthError("All fields are required.");
        return;
    }

    if (!emailInput.includes("@")) {
        showAuthError("Please enter a valid email.");
        return;
    }

    if (passwordInput.length < 6) {
        showAuthError("Password must be at least 6 characters.");
        return;
    }

    // Password match check
    if (passwordInput !== confirmPasswordInput) {
        showAuthError("Passwords do not match. Please verify.");
        return;
    }

    // 2. Successful Registration simulation
    alert("Registration successful! You can now log in using your credentials.");
    switchAuthMode("login");
}

/**
 * Utility to display error banner
 */
function showAuthError(message) {
    const errorBanner = document.getElementById("auth-error-message");
    errorBanner.innerText = message;
    errorBanner.style.display = "block";
}

/**
 * Handle Forgot Password click
 */
function handleForgotPassword(event) {
    event.preventDefault();
    const emailInput = document.getElementById("login-email").value.trim();
    if (emailInput === "") {
        alert("Please enter your email address in the input field first.");
    } else {
        alert(`Reset credentials link has been successfully sent to: ${emailInput}`);
    }
}
