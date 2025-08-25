const express = require('express');
const conversationController = require("../controllers/conversationControllers.js")
const conversationRouter =express.Router();

conversationRouter.post('/conversations', conversationController.newConversation); //Create a new conversation
conversationRouter.put('/conversations/:id', conversationController.newMessage); //Add new message to existing conversation
conversationRouter.get('/conversations', conversationController.getConversation); //Get all conversations
conversationRouter.delete('/conversations/:id',conversationController.deleteConversation); //delete a conversation
module.exports = conversationRouter;