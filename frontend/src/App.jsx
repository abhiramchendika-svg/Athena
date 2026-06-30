import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  async function sendMessage() {
    if (!message.trim()) return;

    const userMessage = message;

    setChat((prev) => [
      ...prev,
      { sender: "You", text: userMessage }
    ]);

    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      setChat((prev) => [
        ...prev,
        {
          sender: "Athena",
          text: data.reply,
        },
      ]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        {
          sender: "Athena",
          text: "❌ Failed to connect to backend.",
        },
      ]);
    }
  }

  return (
    <div className="app">
      <h1>🧠 Athena AI Assistant</h1>

      <div className="chat-box">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "You" ? "user" : "bot"}
          >
            <strong>{msg.sender}:</strong>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Ask Athena anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;