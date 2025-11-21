// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgkjrYAjHFFi6AGkLCeubTUxzN1i1KjXY",
  authDomain: "appturismo-e61de.firebaseapp.com",
  projectId: "appturismo-e61de",
  storageBucket: "appturismo-e61de.firebasestorage.app",
  messagingSenderId: "720504197493",
  appId: "1:720504197493:web:32e5e2b92973e0bd49033c",
  measurementId: "G-H7P6KB4091"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
