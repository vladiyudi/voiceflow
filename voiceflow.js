const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route handler for POST requests
app.post('/post-endpoint', (req, res) => {
   console.log('Received POST request:', req.body);
   res.send('POST request received');
});

// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
