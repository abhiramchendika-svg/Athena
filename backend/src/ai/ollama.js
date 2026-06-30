const { Ollama } = require("ollama");

const ollama = new Ollama({
  host: "http://127.0.0.1:11434",
});

async function askAthena(prompt) {
  try {
    console.log("Sending to Ollama...");

    const response = await ollama.chat({
      model: "qwen3:8b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("Full Response:");
    console.log(response);

    return response.message.content;

  } catch (err) {
    console.error("OLLAMA ERROR:");
    console.error(err);
    throw err;
  }
}

module.exports = { askAthena };