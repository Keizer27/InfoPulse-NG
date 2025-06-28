import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig.js";

// Initialize Firebase App and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load and display articles
async function loadArticles() {
  const container = document.getElementById("articlesContainer");
  container.innerHTML = "<p>Loading articles...</p>";

  try {
    const q = query(collection(db, "articles"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      container.innerHTML = "<p>No articles found.</p>";
      return;
    }

    let html = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      html += `
        <div class="article-card">
          <h2>${data.title}</h2>
          <p>${data.content.replace(/\n/g, "<br>")}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (error) {
    console.error("Error loading articles:", error);
    container.innerHTML = "<p>Error loading articles.</p>";
  }
}

// Run on page load
loadArticles();
