import { useState } from 'react';

function NewMessageForm({ setMessages, setError, setLoading }) {
  const [newMessage, setNewMessage] = useState({
    username: '',
    message: '',
  });

  // post a new message
  async function postMessage(e) {
    e.preventDefault();

    if (newMessage.username === '' || newMessage.message === '') return;

    try {
      const response = await fetch('http://localhost:8080/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newMessage.username,
          message: newMessage.message,
          date: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();

      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage({ username: '', message: '' });
      setError(null);
    } catch (error) {
      setError(error.message);
      setNewMessage({ username: '', message: '' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={postMessage} className="mt-5 flex">
      <div className="flex flex-col w-full">
        {newMessage.username === '' && <span>Required*</span>}
        <input
          type="text"
          value={newMessage.username}
          placeholder="Username"
          onChange={(e) => {
            setNewMessage({ ...newMessage, username: e.target.value });
          }}
          className="p-2 border border-lightPurple text-darkPurple"
        />

        {newMessage.message === '' && <span>Required*</span>}
        <input
          type="text"
          value={newMessage.message}
          placeholder="Message"
          onChange={(e) => {
            setNewMessage({ ...newMessage, message: e.target.value });
          }}
          className="p-2 border border-lightPurple text-darkPurple"
        />
      </div>

      <button
        type="submit"
        className="border border-lightPurple p-5 hover:bg-lightPurple"
      >
        <i className="text-2xl fa-regular fa-paper-plane text-darkPurple"></i>
      </button>
    </form>
  );
}

export default NewMessageForm;
