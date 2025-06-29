
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Replace this with your admin email
const adminEmail = "akinpeluusman2018@gmail.com";

window.login = async function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (email === adminEmail) {
      document.getElementById('login-section').classList.add('hidden');
      document.getElementById('upload-section').classList.remove('hidden');
    } else {
      alert("You are not authorized.");
      signOut(auth);
    }
  } catch (error) {
    alert(error.message);
  }
};

window.logout = function() {
  signOut(auth).then(() => {
    location.reload();
  });
};

window.uploadContent = async function() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const keywords = document.getElementById('keywords').value;
  const imageUrl = document.getElementById('imageUrl').value;
  const category = document.getElementById('category').value;

  try {
    await addDoc(collection(db, "articles"), {
      title, content, keywords, imageUrl, category,
      timestamp: new Date()
    });
    alert("Article uploaded successfully!");
  } catch (error) {
    alert("Error uploading article: " + error.message);
  }
};

window.toggleMenu = function () {
  document.getElementById("menu").classList.toggle("show");
};
