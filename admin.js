import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "Aktxsysnet2v0g8bq3aTmdTm0xy9hmgz",
  authDomain: "infopublic-5x9fb.firebaseapp.com",
  projectId: "infopublic-5x9fb",
  storageBucket: "infopublic-5x9fb.appspot.com",
  messagingSenderId: "5689711e991",
  appId: "1:5689711e991:web:abc123def456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Elements
const form = document.getElementById("articleForm");
const logoutBtn = document.getElementById("logoutBtn");
const userStatus = document.getElementById("userStatus");

// Authentication check (only your UID should pass)
const allowedUID = "sUSNweuc5ZYGvQu5hkMYOcdNP0m1";
onAuthStateChanged(auth, (user) => {
  if (!user || user.uid !== allowedUID) {
    window.location.href = "login.html";
  } else {
    userStatus.textContent = `Logged in as ${user.email}`;
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const category = document.getElementById("category").value;
  const keywords = document.getElementById("keywords").value.trim().toLowerCase();
  const imageFile = document.getElementById("image").files[0];

  if (!title || !content || !category) {
    alert("Please fill in all required fields.");
    return;
  }

  let imageUrl = "";

  if (imageFile) {
    imageUrl = await readImageAsDataURL(imageFile);
  }

  try {
    await addDoc(collection(db, "articles"), {
      title,
      content,
      category,
      keywords,
      imageUrl,
      date: new Date().toLocaleDateString(),
      timestamp: serverTimestamp()
    });

    alert("Article posted successfully!");
    form.reset();
  } catch (err) {
    console.error("Error posting article:", err);
    alert("Failed to post article.");
  }
});

// Convert image to base64 Data URL (no saving to Firebase Storage)
function readImageAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
