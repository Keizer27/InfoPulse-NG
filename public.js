import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, query, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "Aktxsysnet2v0g8bq3aTmdTm0xy9hmgz",
  authDomain: "infopublic-5x9fb.firebaseapp.com",
  projectId: "infopublic-5x9fb",
  storageBucket: "infopublic-5x9fb.appspot.com",
  messagingSenderId: "5689711e991",
  appId: "1:5689711e991:web:abc123def456",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.getElementById("articles-container");

async function loadArticles() {
  const q = query(collection(db, "articles"));
  const querySnapshot = await getDocs(q);
  const hash = location.hash.substring(1);

  container.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const article = doc.data();
    if (!hash || article.category.toLowerCase() === hash.toLowerCase()) {
      const card = document.createElement("div");
      card.className = "article-card";
      card.innerHTML = `
        ${article.imageURL ? `<img src="${article.imageURL}" alt="Article Image" />` : ""}
        <h2>${article.title}</h2>
        <p>${article.content}</p>
        <small><b>Keywords:</b> ${article.keywords || "None"}</small>
      `;
      container.appendChild(card);
    }
  });
}

loadArticles();
window.addEventListener("hashchange", loadArticles);

// Hamburger menu
document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});
