// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOvyc2Wek8xk9Si3kSmmeLyJ7M1FZLV_E",
    authDomain: "serenity-67d11.firebaseapp.com",
    projectId: "serenity-67d11",
    storageBucket: "serenity-67d11.appspot.com",
    messagingSenderId: "255385403806",
    appId: "1:255385403806:web:9a749d0cf065a06db1968f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const signupForm = document.getElementById("signupForm");
const errorMessage = document.getElementById("error-message");
const signupBtn = document.getElementById("signupBtn");
const termsCheckbox = document.getElementById("terms");

// Enable/disable Sign Up button based on Terms checkbox
termsCheckbox.addEventListener("change", () => {
    signupBtn.disabled = !termsCheckbox.checked;
});

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    errorMessage.textContent = "";

    // Password match check
    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return;
    }

    try {
        // Check if email is already registered
        const methods = await fetchSignInMethodsForEmail(auth, email);
        if (methods.length > 0) {
            alert("This email is already registered. Redirecting to login page...");
            window.location.href = "login.html";
            return;
        }

        // Create new Firebase user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update user profile with full name
        await updateProfile(userCredential.user, { displayName: fullName });

        // Redirect to home page after successful signup
        alert("Sign-up successful! Redirecting to home page...");
        window.location.href = "../home/home.html";

    } catch (error) {
        errorMessage.textContent = error.message;
    }
});
