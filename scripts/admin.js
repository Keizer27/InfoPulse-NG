import { db } from './firebase.js';
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Please fill in both fields");
    return;
  }

  try {
    await addDoc(collection(db, "articles"), {
      title,
      content,
      timestamp: serverTimestamp()
    });
    alert("Article posted successfully!");
    document.getElementById("postForm").reset();
  } catch (error) {
    alert("Error: " + error.message);
  }
});
