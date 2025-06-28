import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  query, 
  getDocs,
  orderBy,
  where 
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0EZVBqBGgTOHn6YqIJfmdTmOVJp8n4gc",
  authDomain: "infopulse-5a276.firebaseapp.com",
  projectId: "infopulse-5a276",
  storageBucket: "infopulse-5a276.appspot.com",
  messagingSenderId: "5689711e991",
  appId: "1:568547160991:web:75f63f78408500a2d883aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const container = document.getElementById("articles-container");
const categoryFilter = document.getElementById("categoryFilter");
const darkModeToggle = document.getElementById("darkModeToggle");
const hamburgerMenu = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// State
let currentCategory = 'all';

// Load Articles with Enhanced Features
async function loadArticles() {
  try {
    // Show loading state
    container.innerHTML = `
      <div class="loader">
        <div class="spinner"></div>
        <p>Loading articles...</p>
      </div>
    `;

    // Build query based on current category
    let articlesQuery;
    if (currentCategory === 'all') {
      articlesQuery = query(
        collection(db, "articles"),
        orderBy("publishedAt", "desc")
      );
    } else {
      articlesQuery = query(
        collection(db, "articles"),
        where("category", "==", currentCategory),
        orderBy("publishedAt", "desc")
      );
    }

    const querySnapshot = await getDocs(articlesQuery);
    container.innerHTML = "";

    if (querySnapshot.empty) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-newspaper"></i>
          <h3>No articles found</h3>
          <p>Try selecting a different category</p>
        </div>
      `;
      return;
    }

    querySnapshot.forEach((doc) => {
      const article = doc.data();
      const articleCard = document.createElement("article");
      articleCard.className = "article-card";
      articleCard.innerHTML = `
        ${article.imageURL ? `<img src="${article.imageURL}" alt="${article.title}" loading="lazy">` : ''}
        <div class="article-content">
          <span class="category-tag">${article.category || 'General'}</span>
          <h3><a href="article.html?id=${doc.id}">${article.title}</a></h3>
          <p class="excerpt">${article.excerpt || article.content.substring(0, 150) + '...'}</p>
          <div class="article-meta">
            <span><i class="far fa-clock"></i> ${article.readTime || 5} min read</span>
            <span>${article.publishedAt?.toDate().toLocaleDateString() || 'Recent'}</span>
          </div>
        </div>
      `;
      container.appendChild(articleCard);
    });

  } catch (error) {
    console.error("Error loading articles:", error);
    container.innerHTML = `
      <div class="error-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Error loading content</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// Category Filter
categoryFilter.addEventListener('change', (e) => {
  currentCategory = e.target.value;
  loadArticles();
});

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// Hamburger Menu
hamburgerMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburgerMenu.classList.toggle('open');
});

// Hash-based Filtering (kept for backward compatibility)
window.addEventListener('hashchange', () => {
  const hash = location.hash.substring(1);
  if (hash) {
    currentCategory = hash;
    categoryFilter.value = hash;
    loadArticles();
  }
});

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
  // Set initial category from hash if present
  const hash = location.hash.substring(1);
  if (hash) {
    currentCategory = hash;
    categoryFilter.value = hash;
  }
  loadArticles();
});
