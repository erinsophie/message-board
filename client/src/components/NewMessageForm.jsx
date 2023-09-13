import { useState } from "react";

function NewMessageForm({ setMessages, setError, setLoading }) {
  const [newMessage, setNewMessage] = useState({
    username: "",
    message: "",
  });

  // post a new message
  async function postMessage(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newMessage.username,
          message: newMessage.message,
          date: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();

      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage({ username: "", message: "" });
      setError(null);
    } catch (error) {
      setError(error.message);
      setNewMessage({ username: "", message: "" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={postMessage} className="flex border border-purple-300">
      <div className="flex flex-col">
        <input
          type="text"
          value={newMessage.username}
          placeholder="Username"
          onChange={(e) =>
            setNewMessage({
              ...newMessage,
              username: e.target.value,
            })
          }
        />
        <input
          type="text"
          value={newMessage.message}
          placeholder="Message"
          onChange={(e) =>
            setNewMessage({
              ...newMessage,
              message: e.target.value,
            })
          }
        />
      </div>

      <button type="submit" className="border border-purple-300 p-2">
        <i className="fa-regular fa-paper-plane text-purple-300"></i>
      </button>
    </form>
  );
}

export default NewMessageForm;
