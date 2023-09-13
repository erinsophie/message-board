import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import NewMessageForm from "./newMessageForm";
import Error from "./Error";

function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("messages");
  console.log(messages);

  useEffect(() => {
    // fetch messages
    async function getMessages() {
      try {
        let response = await fetch("http://localhost:8080/api/messages");

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

    getMessages();
  }, []);

  if (error) return <Error error={error} />;

  return (
    <div className="ml-48 mr-48 pt-20 pb-20 flex-1 z-[10] flex flex-col gap-5">
      <h1 className="text-gray-500 text-2xl pb-5">Message board</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        messages.map((message) => (
          <div
            key={message._id}
            className="text-gray-500 border-l-2 pl-4 border-purple-300 flex justify-between"
          >
            <div>
              <p>{message.username}</p>
              <p>{message.message}</p>
            </div>
            <p>{format(parseISO(message.date), "dd/MM/yyyy HH:mm")}</p>
          </div>
        ))
      )}

      <NewMessageForm
        setMessages={setMessages}
        setError={setError}
        setLoading={setLoading}
      />
    </div>
  );
}

export default MessageBoard;
