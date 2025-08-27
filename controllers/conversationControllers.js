const Conversation = require("../models/Conversation");
const { generateContent, generateTitle } = require("../service/geminiService");
const mongoose = require("mongoose");

exports.newConversation = async (req, res) => {
  try {
    const { prompt, model } = req.body;
    
      if (!prompt ) {
        return res.status(400).json({ error: "Prompt and model are required" });
      }
    const content = await generateContent(prompt, model);
    const messages = [{role: "user",content: prompt,},{ role: "assistant", content: content },];
    
      let title;
      try {
        title = await generateTitle(messages);
      } catch (err) {
        console.error("Title generation failed:", err.message);
        title = prompt.slice(0, 20) + "...";
      }
   const conversation = new Conversation({
      userId: req.user._id,
      title,
      model: model || "gemini-2.5-flash",
      messages,
    });

    await conversation.save();
    console.log(conversation);
    
    res.status(201).json(conversation);
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.newMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { prompt } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid conversation ID format" });
    }
    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    const content = await generateContent(
      prompt,
      conversation.model,
      conversation.messages
    );
    conversation.messages.push({ role: "user", content: prompt });
    conversation.messages.push({ role: "assistant", content: content });
    await conversation.save();
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
 };
// exports.getConversation = async (req, res) => {
//   try {
//     const conversations = await Conversation.find().sort({ createdAt: -1 });
//     res.json(conversations);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// Get user conversations only
exports.getConversation = async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid conversation ID format" });
    }
    await Conversation.findByIdAndDelete(id);
    res.status(200).json({ message: "Conversation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
