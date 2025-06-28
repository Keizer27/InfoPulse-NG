// Firebase configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyA0EZVBqBGgTOHn6YqIJfmdTmOVJp8n4gc",
  authDomain: "infopulse-5a276.firebaseapp.com",
  projectId: "infopulse-5a276",
  storageBucket: "infopulse-5a276.appspot.com",
  messagingSenderId: "568547160991",
  appId: "1:568547160991:web:75f63f78408500a2d883aa",
  measurementId: "G-LMHT21R9GW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };