const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection string
const MongoDBURL = "mongodb+srv://mdshahnawazm17:0786%401234@cluster0.ucjqz7r.mongodb.net/Gemini-conversations";

// Import authentication middleware and controllers
const { authenticateUser } = require('./middleware/auth.js');
const authController = require('./controllers/authController.js');
const conversationRouter = require('./routers/conversation.js');
require("./CronJobs/cleanupConversations");
const authRouter = express.Router();

// Define auth routes (public)
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

// Apply authRouter on /api/auth prefix (open routes)
app.use('/api/auth', authRouter);

// Protect conversation routes with authentication middleware
app.use('/api/conversations', authenticateUser, conversationRouter);

// Test route
app.get('/test', (req, res) => {
  res.send('API is working');
});

// Connect to MongoDB then start server
const PORT = process.env.PORT || 5000;

mongoose.connect(MongoDBURL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Could not connect to MongoDB...', err);
  });
