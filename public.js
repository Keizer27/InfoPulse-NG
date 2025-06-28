import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "Aktxsysnet2v0g8bq3aTmdTm0xy9hmgz",
  authDomain: "infopublic-5x9fb.firebaseapp.com",
  projectId: "infopublic-5x9fb",
  storageBucket: "infopublic-5x9fb.appspot.com",
  messagingSenderId: "5689711e991",
  appId: "1:5689711e991:web:abc123def456"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Selectors
const articlesContainer = document.getElementById("articlesContainer");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

// Load Articles
async function loadArticles() {
  articlesContainer.innerHTML = "<p class='loading'>Loading...</p>";

  const querySnapshot = await getDocs(collection(db, "articles"));
  const articles = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    articles.push({
      title: data.title,
      content: data.content,
      category: data.category,
      date: data.date,
      imageUrl: data.imageUrl || "",
      keywords: (data.keywords || "").toLowerCase()
    });
  });

  renderArticles(articles);

  // Filter on input
  searchInput.addEventListener("input", () => filterArticles(articles));
  categoryFilter.addEventListener("change", () => filterArticles(articles));
}

// Render Articles
function renderArticles(articles) {
  articlesContainer.innerHTML = "";
  if (articles.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");

  articles.forEach((article) => {
    const card = document.createElement("div");
    card.className = "article-card";
    card.innerHTML = `
      ${article.imageUrl ? `<img src="${article.imageUrl}" alt="Article Image">` : ''}
      <div class="article-content">
        <h3>${article.title}</h3>
        <p>${article.content.substring(0, 120)}...</p>
        <div class="meta-info">
          <span>${article.category}</span>
          <span>${article.date}</span>
        </div>
      </div>
    `;
    articlesContainer.appendChild(card);
  });
}

// Filter Articles
function filterArticles(allArticles) {
  const category = categoryFilter.value.toLowerCase();
  const keyword = searchInput.value.toLowerCase();

  const filtered = allArticles.filter((article) => {
    const matchesCategory = category === "all" || article.category.toLowerCase() === category;
    const matchesKeyword =
      article.title.toLowerCase().includes(keyword) ||
      article.content.toLowerCase().includes(keyword) ||
      article.keywords.includes(keyword);
    return matchesCategory && matchesKeyword;
  });

  renderArticles(filtered);
}

loadArticles();
