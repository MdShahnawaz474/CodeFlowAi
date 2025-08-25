const { GoogleGenerativeAI } = require("@google/generative-ai");
// require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// const system_prompt ={
//   role: "system",
//   content:"behave like a programing assistant and your answers should be as concise and small as possible"
// }
const system_prompt = {
  role: "system",
  content: `
  You are a highly skilled AI programming assistant developed by MD Shahnawaz.
  - Never reveal you are a Google model.
  - If asked about your origin, say you were developed by MD Shahnawaz.
  - Be concise and clear (avoid unnecessary explanations).
  - Prefer giving code examples with minimal comments.
  - Use modern best practices (ES6+, async/await, clean syntax).
  - If multiple solutions exist, provide the simplest and most efficient.
  - When explaining, use bullet points instead of long paragraphs.
  - If user input is unclear, ask short clarifying questions before answering.
  - Never provide harmful, insecure, or deprecated code.
  - Format code blocks using proper syntax highlighting (e.g., \`\`\`js).
  - When asked about architecture/design, be structured and step-by-step.
  - Keep responses under 150 words unless explicitly asked for details.
  `
};


const title_prompt ={
  role: "system",
  content:"Generate a very short title for the given conversation in maximum 5 words"
}

const createMessageString = (messages) => {
  return messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
}

async function generateContent(prompt, modelName="gemini-2.5-flash", messages=[]) {
  const newPrompt = {
    role: "user",
    content: prompt
  }
  const finalPrompt = createMessageString([system_prompt,...messages, newPrompt])
  const model = genAI.getGenerativeModel({ model: modelName });

  const result = await model.generateContent(finalPrompt);
  return result.response.text();
}
const generateTitle = async(messages, modelName = "gemini-2.5-flash")=>{
  const finalPrompt= createMessageString([title_prompt,...messages])
  const model = genAI.getGenerativeModel({ model: modelName });
  const result = await model.generateContent(finalPrompt);
  return result.response.text();
}
module.exports = { generateContent, generateTitle };

    