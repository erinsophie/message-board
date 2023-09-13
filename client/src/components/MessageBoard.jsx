import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import NewMessageForm from './newMessageForm';
import Error from './Error';
import Loading from './Loading';

function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('messages');
  console.log(messages);

  useEffect(() => {
    // fetch messages
    async function getMessages() {
      try {
        let response = await fetch('http://localhost:8080/api/messages');

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
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
    <div className="ml-48 mr-48 mt-20 mb-20 flex-1 flex flex-col gap-3 z-[10] text-darkPurple">
      <h1 className="font-bold text-2xl pb-5">Message board</h1>
      <p>{messages.length} total messages</p>

      <div className="flex-1 flex flex-col gap-5">
        {loading ? (
          <Loading />
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className="border-l-2 border-lightPurple pl-4 flex justify-between"
            >
              <div>
                <p className="font-bold">{message.username}</p>
                <p>{message.message}</p>
              </div>
              <p className="text-lightPurple">
                {format(parseISO(message.date), 'dd/MM/yyyy HH:mm')}
              </p>
            </div>
          ))
        )}
      </div>

      <NewMessageForm
        setMessages={setMessages}
        setError={setError}
        setLoading={setLoading}
      />
    </div>
  );
}

export default MessageBoard;
