import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyDW85ZEb-dQ-0XpTQ3OVWsna9tG6C5PZYU",
    authDomain: "animalbiteclinic-84ca7.firebaseapp.com",
    databaseURL: "https://animalbiteclinic-84ca7-default-rtdb.firebaseio.com",
    projectId: "animalbiteclinic-84ca7",
    storageBucket: "animalbiteclinic-84ca7.firebasestorage.app",
    messagingSenderId: "69405337111",
    appId: "1:69405337111:web:8323902876ede3bbc61e52"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const form = document.querySelector('form');
const submitBtn = document.getElementById('submitbutton');
const togglePasswordBtn = document.getElementById('togglePassword');

if (togglePasswordBtn) {
  togglePasswordBtn.addEventListener('click', function() {
    const pwd = document.getElementById('password');
    if (!pwd) return;
    if (pwd.type === 'password') {
      pwd.type = 'text';
      togglePasswordBtn.textContent = 'Hide';
      togglePasswordBtn.setAttribute('aria-label', 'Hide password');
    } else {
      pwd.type = 'password';
      togglePasswordBtn.textContent = 'Show';
      togglePasswordBtn.setAttribute('aria-label', 'Show password');
    }
  });
}

if (form && submitBtn) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = (document.getElementById('username')).value.trim();
    const password = (document.getElementById('password')).value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // navigate to root; the app's auth listener will pick up the signed-in user
        window.location.href = "/";
      })
      .catch((error) => {
        alert(error.message || 'Login failed');
        console.error('Auth error:', error);
      });
  });
}

