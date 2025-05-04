document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const userTable = document.getElementById('userTable');
  

    if (registerForm) {
      registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const user = {
          name: document.getElementById('name').value.trim(),
          email: document.getElementById('email').value.trim(),
          mobile: document.getElementById('mobile').value.trim(),
          dob: document.getElementById('dob').value,
          city: document.getElementById('city').value.trim(),
          address: document.getElementById('address').value.trim(),
          username: document.getElementById('username').value.trim(),
          password: document.getElementById('password').value
        };
  
  
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
  
        alert("Registration successful!");
        // registerForm.reset();
      });
    }
  
    // Handle Login
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
  
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const match = users.find(u => u.username === username && u.password === password);
  
        if (match) {
          alert("Login successful!");
          window.location.href = 'users.html';
        } else {
          alert("Invalid credentials!");
        }
      });
    }
  
    // Display user list
    if (userTable) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const tbody = userTable.querySelector('tbody');
  
      users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.mobile}</td>
          <td>${user.dob}</td>
          <td>${user.city}</td>
          <td>${user.address}</td>
        `;
        tbody.appendChild(row);
      });
    }
  });
  