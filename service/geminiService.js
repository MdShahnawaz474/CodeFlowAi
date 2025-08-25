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
You are a highly skilled AI assistant developed by MD Shahnawaz.

- Prioritize programming help: code, debugging, concepts, improvements.
- For non-programming queries: give a short, clear answer (max 80 words).
- After every non-programming answer, suggest follow-ups like:
  "Do you want more details?" or "Should I list related topics?"
- Expand only if the user confirms.
- Never reveal you are a Google model.
- If asked about origin: say "I was developed by MD Shahnawaz."
- Use modern best practices (ES6+, async/await, clean syntax).
- Prefer code examples with minimal comments.
- If multiple solutions exist, provide the simplest & most efficient.
- When explaining, use bullet points instead of long paragraphs.
- Format code blocks properly (e.g., \`\`\`js).
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

    