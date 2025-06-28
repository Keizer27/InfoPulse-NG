// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA0EZVBqBGgTOHn6YqIJfmdTmOVJp8n4gc",
  authDomain: "infopulse-5x9fb.firebaseapp.com",
  projectId: "infopulse-5x9fb",
  storageBucket: "infopulse-5x9fb.appspot.com",
  messagingSenderId: "5689711e991",
  appId: "1:568547160991:web:75f63f78408500a2d883aa",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Admin UID
const adminUID = "sUSNweuc5ZYGvQu5hkMYOcdNP0m1";

// Check if logged in and authorized
auth.onAuthStateChanged((user) => {
  if (!user || user.uid !== adminUID) {
    window.location.href = "login.html";
  }
});

// Post article logic
document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const category = document.getElementById("category").value;
  const keywords = document.getElementById("keywords").value.trim();
  const imageInput = document.getElementById("image");
  let imageData = null;

  // Optional: Handle image preview (not saved)
  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageData = e.target.result;

      // Save to Firestore with image
      saveArticle(title, content, category, keywords, imageData);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    // Save without image
    saveArticle(title, content, category, keywords, null);
  }
});

function saveArticle(title, content, category, keywords, image) {
  db.collection("articles")
    .add({
      title,
      content,
      category,
      keywords,
      image,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      alert("Article posted successfully!");
      document.getElementById("postForm").reset();
    })
    .catch((error) => {
      console.error("Error posting article:", error);
      alert("Failed to post article.");
    });
}
