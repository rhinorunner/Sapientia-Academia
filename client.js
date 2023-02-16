const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const usernameOrEmail = document.getElementById('username-email-input').value;
  const password = document.getElementById('password-input').value;
  
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ usernameOrEmail, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Redirect the user to the home page
      window.location.href = '/home';
    } else {
      // Display an error message
      const errorContainer = document.getElementById('error-container');
      errorContainer.textContent = data.message;
    }
  });
});
