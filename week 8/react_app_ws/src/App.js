import React, { useState, useEffect } from 'react';
import './App.css';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function App() {
  const socketUrl = 'ws://localhost:8080';
  const customID = 'React-APP';

  const [potentiometerValue, setPotentiometerValue] = useState(0);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => {
      sendMessage(JSON.stringify({ type: 'setID', id: customID }));
    },
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data = JSON.parse(lastMessage.data);
        if (data.potentiometer !== undefined) {
          setPotentiometerValue(data.potentiometer);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    }
  }, [lastMessage]);

  return (
    <div>
      <header>
        <div>
          <h1>WebSocket Example</h1>
          <button onClick={() => sendMessage('Hello WebSocket!')}>
            Send Message
          </button>
          <button onClick={() => sendMessage('ADD_1_LED')}>Add 1 LED</button>
          <button onClick={() => sendMessage('REMOVE_1_LED')}>
            Remove 1 LED
          </button>
          <p>
            Last message: {lastMessage ? lastMessage.data : 'No message yet'}
          </p>
          <p>Connection status: {connectionStatus}</p>
          <p>Potentiometer Value: {potentiometerValue}</p>
        </div>
      </header>
    </div>
  );
}

export default App;