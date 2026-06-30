const { askAthena } = require("../ai/ollama");
const systemPrompt = require("../prompts/systemPrompt");

async function processMessage(message) {

    const prompt = `
${systemPrompt}

User:
${message}
`;

    console.log("===== PROMPT =====");
    console.log(prompt);

    const reply = await askAthena(prompt);

    console.log("===== REPLY =====");
    console.log(reply);

    return reply;
}

module.exports = { processMessage };