import { db, auth } from "./firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore-lite.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Auth check
onAuthStateChanged(auth, (user) => {
  if (!user || user.uid !== "sUSNweuc5ZYGvQu5hkMYOcdNP0m1") {
    window.location.href = "login.html";
  }
});

// Handle logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});

// Submit article
document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const niche = document.getElementById("niche").value;
  const keywords = document.getElementById("keywords").value.trim().split(",").map(k => k.trim());
  const imageFile = document.getElementById("imageUpload").files[0];

  if (!title || !content || !niche) {
    alert("Please fill all required fields.");
    return;
  }

  let imageUrl = "";
  if (imageFile) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      imageUrl = reader.result;
      await saveArticle();
    };
    reader.readAsDataURL(imageFile);
  } else {
    await saveArticle();
  }

  async function saveArticle() {
    try {
      await addDoc(collection(db, "articles"), {
        title,
        content,
        niche,
        keywords,
        imageUrl,
        createdAt: serverTimestamp()
      });
      alert("Article posted!");
      document.getElementById("postForm").reset();
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to post article.");
    }
  }
});
