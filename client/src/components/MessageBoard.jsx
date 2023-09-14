import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import NewMessageForm from './NewMessageForm';
import Error from './Error';
import Loading from './Loading';

function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('oldest');

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

  const sortedMessages = [...messages].sort((a, b) => {
    return sortOrder === 'oldest'
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="mt-5 mb-5 ml-3 mr-3 flex-1 flex flex-col gap-3 z-[10] text-darkPurple md:ml-16 md:mr-16 md:mt-12 md:mb-12 lg:ml-48 lg:mr-48">
      <h1 className="font-bold text-2xl pb-5">Message board</h1>
      <p>{messages.length} total messages</p>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="w-48 border border-lightPurple pl-2 pr-2"
      >
        {' '}
        <option value="oldest">Oldest to Newest</option>
        <option value="newest">Newest to Oldest</option>
      </select>

      <div className="flex-1 flex flex-col gap-5">
        {loading ? (
          <Loading />
        ) : (
          sortedMessages.map((message) => (
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
