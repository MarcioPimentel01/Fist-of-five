// HTML form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.container form');
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const formData = new FormData(form);
      const username = formData.get('email');
      const password = formData.get('psw');
  
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        const data = await response.json();
        console.log(data);
        // Handle success or error response from the server
      } catch (error) {
        console.error('Error during registration:', error);
        // Handle error
      }
    });
  });