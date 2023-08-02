import { useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import Chat from './Chat';

const socket = io.connect('https://chat-app-api-ixdo.onrender.com')

function App() {
  const [ username,setUserame] = useState('');
  const [ room,setRoom ] = useState('');
  const [ showChat,setShowChat ] = useState(false);

  const joinRoom = () => {
     if (username !== '' && room !== '') {
      socket.emit('join_group', room);
      setShowChat(true);
     }
  }
  return (
    <div className="App">
      {!showChat ? (
      <div className='joinChatContainer'>
      <h2>Join Chat</h2>
      <input type='text' placeholder='Name...' onChange={(e)=>{setUserame(e.target.value);}} />
      <input type='text' placeholder='Group ID...' onChange={(e)=>{setRoom(e.target.value);}} />
      <button onClick={joinRoom}>Join </button>
      </div>
      ) : (
     <Chat socket={socket} username={username} room={room} />
  )}
    </div>
  );
}

export default App;
