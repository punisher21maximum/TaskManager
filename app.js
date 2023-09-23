// app.js
const express = require('express');
const app = express();
  
// Middleware to parse JSON request bodies
app.use(express.json());

// Import API endpoint files
const taskApi = require('./api/taskApi');

// Use API endpoint routers
app.use('/api', taskApi);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the Express app
