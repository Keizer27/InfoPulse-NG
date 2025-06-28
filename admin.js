import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Set your admin UID or email
const adminEmail = "akinpeluusman2018@gmail.com";

// Check admin access
onAuthStateChanged(auth, (user) => {
  if (user && user.email === adminEmail) {
    console.log("Admin logged in:", user.email);
  } else {
    alert("Access denied: Admins only.");
    window.location.href = "login.html";
  }
});

// Handle article form submission
const form = document.getElementById("articleForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Title and content cannot be empty.");
    return;
  }

  try {
    await addDoc(collection(db, "articles"), {
      title,
      content,
      timestamp: serverTimestamp()
    });

    alert("Article posted successfully!");
    form.reset();
  } catch (err) {
    console.error("Error posting article:", err);
    alert("Failed to post article.");
  }
});

// Logout button (if added in HTML)
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  });
}
