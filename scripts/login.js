import { auth } from './firebase.js';
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const adminEmail = "akinpeluusman2018@gmail.com";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential.user.email === adminEmail) {
      window.location.href = "/admin.html";
    } else {
      alert("Access denied. Not authorized.");
    }
  } catch (error) {
    alert("Login error: " + error.message);
  }
});
