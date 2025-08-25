const mongoose = require('mongoose');
/**
 * Mongoose schema for a conversation.
 * 
 * Represents a conversation with the following fields:
 * - title: The title of the conversation (required).
 * - model: The AI model used in the conversation (required).
 * - startTime: The timestamp when the conversation started (defaults to current date/time).
 * - messages: An array of message objects, each containing:
 *    - role: The sender's role, either 'user' or 'assistant' (required).
 *    - content: The message content (required).
 */
const conversationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    model: { type: String, required: true },
    startTime: { type: Date, default: Date.now },
    messages:[
        {
            role:{type : String, enum: ['user', 'assistant'], required: true},
            content:{type: String, required: true}
        }
    ]
});
module.exports = mongoose.model('Conversation', conversationSchema);