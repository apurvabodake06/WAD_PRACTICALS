const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const USERS_FILE = 'users.json';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Create users.json if it doesn't exist
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify([]));

// POST registration
app.post('/register', (req, res) => {
  const user = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  // Check for duplicate username
  if (users.find(u => u.username === user.username)) {
    return res.status(400).json({ message: "Username already exists." });
  }

  users.push(user);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users));
  res.json({ message: "Registration successful" });
});

// POST login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// GET users
app.get('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
