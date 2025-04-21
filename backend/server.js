require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const chatbotRoutes = require('./routes/chatbotRoutes');

const app = express();
const PORT = process.env.PORT || 5005;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allow all origins
app.use(express.json());

// Routes
app.use('/api/chatbot', chatbotRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('🍽️ Restaurant Chatbot Backend Running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
