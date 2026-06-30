const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { initDatabase } = require("./memory/database");

const { saveMemory, getMemory } = require("./memory/memory");

await saveMemory("name", "Abhiram");

const user = await getMemory("name");

console.log(user);

const { processMessage } = require("./services/athena");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Athena Backend is Running 🚀"
  });
});

app.post("/chat", async (req, res) => {
  console.log("POST /chat called");
  console.log(req.body);

  try {
    const { message } = req.body;

    const reply = await processMessage(message);

    res.json({
      reply
    });

  } catch (error) {
  console.error("========== ERROR ==========");
  console.error(error);

  res.status(500).json({
    error: error.message,
    stack: error.stack
  });
}
});

const PORT = process.env.PORT || 5000;

async function startServer() {
    await initDatabase();

    app.listen(PORT, () => {
        console.log(`🚀 Athena running on http://localhost:${PORT}`);
    });
}

startServer();