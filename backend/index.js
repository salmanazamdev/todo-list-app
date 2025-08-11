const express = require('express');

// Initialized Express App
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Imported Route Handlers
const welcome = require('./functions/welcome/welcome');
const signup = require('./functions/auth/signup');
const login = require('./functions/auth/login');
const loggin = require('./middleware/loggin');

// Basic Route
app.get('/', loggin, welcome);


// Auth Routes
app.post('/signup', loggin, signup);
app.post('/login', loggin, login);


// Tasks handlers
const addTask = require('./functions/tasks/addTask');
const getTasksByUserId = require('./functions/tasks/getTasksByUserId');

// Tasks Routes
app.post('/tasks', loggin, addTask);
app.get('/tasks/:userId', loggin, getTasksByUserId);


// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});