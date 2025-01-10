import React, { useState } from "react";
import axios from "axios";
import Navbar from "./component/Navbar";

const App = () => {
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState([]);
  const [querying, setQuerying] = useState(false);

  // Handle query submission
  const handleQuery = async () => {
    if (!query.trim()) {
      alert("Please enter a query.");
      return;
    }

    // Add user's query to chat
    setChat((prevChat) => [...prevChat, { type: "user", message: query }]);
    setQuery("");
    setQuerying(true);

    try {
      const response = await axios.get("http://127.0.0.1:8000/query/", {
        params: { query },
      });

      // Add AI's response to chat
      setChat((prevChat) => [
        ...prevChat,
        { type: "ai", message: response.data.answer || "No answer found." },
      ]);
    } catch (error) {
      setChat((prevChat) => [
        ...prevChat,
        { type: "ai", message: error.response?.data?.detail || "An error occurred." },
      ]);
    } finally {
      setQuerying(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
      {/* Navbar */}
      <Navbar />

      {/* Chat Window */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          boxSizing: "border-box",
          paddingTop: "80px"
        }}
      >
        {chat.map((message, index) => (
          <div
            key={index}
            style={{
              width: "100%", // Ensure message takes full width
              display: "flex",
              justifyContent: message.type === "user" ? "flex-end" : "flex-start", // Reverse positions
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: message.type === "user" ? "10px" : "0",
                marginRight: message.type === "ai" ? "10px" : "0",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: message.type === "user" ? "#007BFF" : "#f1f1f1",
                  color: message.type === "user" ? "#fff" : "#333",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                {message.type === "user" ? "M" : "A"}
              </div>

              {/* Message */}
              <div
                style={{
                  backgroundColor: message.type === "user" ? "#007BFF" : "#f1f1f1",
                  color: message.type === "user" ? "#fff" : "#333",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  maxWidth: "90%", // Optional: set a max width for readability
                  wordWrap: "break-word",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                {message.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div
        style={{
          padding: "10px",
          backgroundColor: "#fff",
          borderTop: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
          height: "90px"
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Send a message..."
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "10px",
            width: "100%", // Ensure the input box also takes full width
            boxSizing: "border-box",
            height: "50px",
            backgroundColor: "#fff", // White background
            color: "#808080", // Grey text color
          }}
        />

        <button
          onClick={handleQuery}
          disabled={querying}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            height: "50px"
          }}
        >
          {querying ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default App;
