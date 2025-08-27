const express = require('express');
const conversationController = require("../controllers/conversationControllers.js")
const conversationRouter =express.Router();

conversationRouter.post('/', conversationController.newConversation); //Create a new conversation
conversationRouter.put('/:id', conversationController.newMessage); //Add new message to existing conversation
conversationRouter.get('/', conversationController.getConversation); //Get all conversations
conversationRouter.delete('/:id',conversationController.deleteConversation); //delete a conversation
module.exports = conversationRouter;