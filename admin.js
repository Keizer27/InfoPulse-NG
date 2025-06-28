// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA0EZVBqBGgTOHn6YqIJfmdTmOVJp8n4gc",
  authDomain: "infopulse-5a276.firebaseapp.com",
  projectId: "infopulse-5a276",
  storageBucket: "infopulse-5a276.appspot.com",
  messagingSenderId: "5689711e991",
  appId: "1:568547160991:web:75f63f78408500a2d883aa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// DOM Elements
const postForm = document.getElementById('postForm');
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.admin-sidebar');
const adminEmail = document.getElementById('adminEmail');
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');

// Show logged in admin email
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    adminEmail.textContent = user.email;
  } else {
    window.location.href = 'login.html';
  }
});

// Logout function
function logout() {
  firebase.auth().signOut()
    .then(() => {
      window.location.href = 'login.html';
    });
}

// Toggle sidebar on mobile
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Image preview
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  }
});

// Form submission
postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const excerpt = document.getElementById('excerpt').value;
  const category = document.getElementById('category').value;
  const keywords = document.getElementById('keywords').value;
  const readTime = document.getElementById('readTime').value;
  const featured = document.getElementById('featured').checked;
  const published = document.getElementById('published').checked;
  const imageFile = imageInput.files[0];

  try {
    // Upload image if exists
    let imageURL = '';
    if (imageFile) {
      const storageRef = storage.ref(`articles/${Date.now()}_${imageFile.name}`);
      const snapshot = await storageRef.put(imageFile);
      imageURL = await snapshot.ref.getDownloadURL();
    }

    // Save to Firestore
    await db.collection('articles').add({
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      category,
      keywords: keywords.split(',').map(k => k.trim()),
      readTime: parseInt(readTime),
      featured,
      published,
      imageURL,
      publishedAt: firebase.firestore.FieldValue.serverTimestamp(),
      author: firebase.auth().currentUser.email,
      views: 0
    });

    showToast('Article published successfully!', 'success');
    postForm.reset();
    imagePreview.innerHTML = '<i class="fas fa-image"></i><span>No image selected</span>';
  } catch (error) {
    console.error('Error publishing article:', error);
    showToast('Error publishing article: ' + error.message, 'error');
  }
});

// Save draft functionality
document.getElementById('saveDraft').addEventListener('click', async () => {
  // Similar to publish but with published: false
  showToast('Draft saved successfully!', 'success');
});

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show';
  
  if (type === 'error') {
    toast.style.background = 'var(--danger)';
  } else if (type === 'warning') {
    toast.style.background = 'var(--warning)';
  } else {
    toast.style.background = 'var(--success)';
  }
  
  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}
