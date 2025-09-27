// login.js (compat) – uses the same firebase compat instance as other pages
// Assumes /Javascript/firebase.js already initialized firebase.initializeApp(...)

document.addEventListener('DOMContentLoaded', function(){
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
      var email = (document.getElementById('username')).value.trim();
      var password = (document.getElementById('password')).value;

      if (!window.firebase || !firebase.auth) {
        alert('Firebase not loaded. Try reloading the page.');
        return;
      }

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(userCredential){
          // signed in: navigate to root where the app-level auth listener will initialize the UI
          window.location.href = '/';
        })
        .catch(function(error){
          alert(error && error.message ? error.message : 'Login failed');
          console.error('Auth error:', error);
        });
    });
  }
});

