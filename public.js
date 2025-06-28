// Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

const container = document.getElementById('articles-container');

// Load Articles
async function loadArticles() {
  const querySnapshot = await getDocs(collection(db, "articles"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const article = document.createElement('div');
    article.classList.add('article');

    // Optional image
    if (data.imageUrl) {
      const img = document.createElement('img');
      img.src = data.imageUrl;
      img.alt = data.title || "Article Image";
      img.className = "article-image";
      article.appendChild(img);
    }

    // Title
    const title = document.createElement('h2');
    title.textContent = data.title || "Untitled";
    title.className = "article-title";
    article.appendChild(title);

    // Keyword tag
    if (data.keyword) {
      const keyword = document.createElement('p');
      keyword.textContent = `🔍 Keyword: ${data.keyword}`;
      keyword.className = "article-keyword";
      article.appendChild(keyword);
    }

    // Category
    if (data.category) {
      const category = document.createElement('p');
      category.textContent = `📂 Category: ${data.category}`;
      category.className = "article-category";
      article.appendChild(category);
    }

    // Content
    const content = document.createElement('p');
    content.innerHTML = data.content || "No content available.";
    content.className = "article-content";
    article.appendChild(content);

    container.appendChild(article);
  });
}

loadArticles();
