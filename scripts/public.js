import { db } from './firebase.js';
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

async function loadArticles() {
  const articlesRef = collection(db, "articles");
  const q = query(articlesRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  const container = document.getElementById("articles");

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "article";
    div.innerHTML = `<h2>${data.title}</h2><p>${data.content}</p><hr>`;
    container.appendChild(div);
  });
}

window.addEventListener("DOMContentLoaded", loadArticles);
