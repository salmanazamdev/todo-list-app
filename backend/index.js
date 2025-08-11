const express = require('express');

// Initialized Express App
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Imported Route Handlers
const welcome = require('./functions/welcome');
const signup = require('./functions/auth');
const login = require('./functions/auth');

// Basic Route
app.get('/', loggin, welcome);


// Auth Routes
app.post('/signup', loggin, signup);
app.post('/login', loggin, login);


// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});