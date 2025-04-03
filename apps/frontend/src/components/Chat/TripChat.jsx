import { useMutation, useSubscription } from '@apollo/client';
import { useState } from 'react';

const SEND_MESSAGE = gql`
  mutation SendMessage($tripId: ID!, $message: String!) {
    sendTripMessage(tripId: $tripId, message: $message) {
      id
      message
      timestamp
      user {
        id
        name
      }
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageAdded($tripId: ID!) {
    messageAdded(tripId: $tripId) {
      id
      message
      timestamp
      user {
        id
        name
      }
    }
  }
`;

export default function TripChat({ tripId, currentUser }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  
  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { tripId },
    onSubscriptionData: ({ subscriptionData }) => {
      setMessages(prev => [...prev, subscriptionData.data.messageAdded]);
    }
  });

  const handleSend = async () => {
    if (!message.trim()) return;
    
    try {
      await sendMessage({
        variables: { tripId, message }
      });
      setMessage('');
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="trip-chat">
      <div className="messages">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message ${msg.user.id === currentUser.id ? 'sent' : 'received'}`}
          >
            <div className="sender">{msg.user.name}</div>
            <div className="content">{msg.message}</div>
            <div className="time">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}