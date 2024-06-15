// HTML form submission handling
document.getElementById('signupForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = event.target.username.value;
  const password = event.target.psw.value;
  const passwordRepeat = event.target['psw-repeat'].value;

  if (password !== passwordRepeat) {
      alert('Passwords do not match!');
      return;
  }

  try {
      const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
          alert('Account created successfully!');
          window.location.href = './posts.html';
      } else {
          const error = await response.json();
          alert('Error: ' + error.message);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
  }
});
