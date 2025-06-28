// firebaseConfig.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "Aktxsysnet2v0g8bq3aTmdTm0xy9hmgz",
  authDomain: "infopublic-5x9fb.firebaseapp.com",
  projectId: "infopublic-5x9fb",
  storageBucket: "infopublic-5x9fb.appspot.com",
  messagingSenderId: "5689711e991",
  appId: "1:5689711e991:web:abc123def456",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export so other scripts can use
export { app, auth, db };
