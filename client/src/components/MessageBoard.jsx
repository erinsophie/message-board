import { useState, useEffect } from "react";

function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  console.log("messages");
  console.log(messages);

  useEffect(() => {
    getMessages();
  }, []);

  async function getMessages() {
    try {
      let response = await fetch("http://localhost:8080/messages");

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      let data = await response.json();
      setMessages(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 z-[10] border border-black m-10">
      {messages.map((message) => (
        <div key={message._id} className="border border-gray-400 border-2 flex justify-between">
          <div>
            <p>{message.username}</p>
            <p>{message.message}</p>
          </div>
          <p>{message.date}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageBoard;
