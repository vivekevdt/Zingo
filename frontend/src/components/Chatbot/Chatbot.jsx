import React, { useState, useRef, useEffect, useContext } from "react";
import DOMPurify from "dompurify";

import "./Chatbot.css";
import { StoreContext } from "../../context/StoreContext";

export default function Chatbot() {
  const { token, loadCartData } = useContext(StoreContext);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi 👋 I’m your food assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Load cart when token becomes available
  useEffect(() => {
    if (token) loadCartData(token);
  }, [token]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    const userMsg = { role: "user", text: userText };

    // Add user msg + typing indicator
    setMessages((prev) => [...prev, userMsg, { role: "typing", text: "" }]);
    setInput("");

    try {
      const headers = { "Content-Type": "application/json" };
      if (token) headers.token = token;

      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();
      let botText = data.reply || "🤖 Sorry, I didn’t get that.";

      // 🔁 Reload cart if chatbot modified it
      if (token && botText.toLowerCase().includes("added to cart")) {
        loadCartData(token);
      }

      // Replace typing indicator with bot reply
      setMessages((prev) => {
        const updated = [...prev];
        if (updated[updated.length - 1]?.role === "typing") {
          updated.pop();
        }
        return [...updated, { role: "bot", text: botText }];
      });
    } catch (err) {
      // Replace typing with error
      setMessages((prev) => {
        const updated = [...prev];
        if (updated[updated.length - 1]?.role === "typing") {
          updated.pop();
        }
        return [
          ...updated,
          { role: "bot", text: "⚠️ Server error. Please try again." },
        ];
      });
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="chatbot-fab" onClick={() => setOpen(!open)}>
        {open ? "✖" : "💬"}
      </div>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            🍔 Food Assistant
            <span onClick={() => setOpen(false)}>✖</span>
          </div>

          <div className="chatbot-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.role === "typing" ? (
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  <div
                        className="bot-message"

                   dangerouslySetInnerHTML={{ __html: m.text }} />
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="chatbot-footer">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
