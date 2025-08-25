const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const MongoDBURL = "mongodb+srv://mdshahnawazm17:0786%401234@cluster0.ucjqz7r.mongodb.net/Gemini-conversations";

// Routes
const conversationRouter = require("./routers/conversation.js");
app.use('/api', conversationRouter);


app.get("/test",(req,res)=>{
// http://localhost:8080/test for testing URL
    res.send("API is working") 
})

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    mongoose.connect(MongoDBURL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
  console.log(`Server is running on port ${PORT}`);
});
