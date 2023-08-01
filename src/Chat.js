import React, { useState,useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({socket, username, room }) => {
    const [ message, setMessage ] = useState('');
    const [ messageList,setMessageList ] = useState([]);

    const sendMessage = async () => {
        if(message !== '') {
            const messageData = {
                room: room,
                author: username,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
         
           await socket.emit('send_message', messageData);
           setMessageList((list)=>[...list, messageData]);
           setMessage('');
        }
    };

    useEffect(()=>{
        socket.on('recieve_message',(data)=>{
            setMessageList((list)=>[...list, data]);
        });
    }, [socket]);
  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Chat</p>
        </div>
        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
           {messageList.map((messageContent)=>{
             return (
             <div className='message' id={username === messageContent.author ? 'you' : 'other'}>
                <div>
                    <div className='message-content'>
                        <p>{messageContent.message}</p>
                    </div>
                    <div className='message-meta'>
                        <p id='time'>{messageContent.time}</p>
                        <p id='author'>{messageContent.author}</p>
                    </div>
                </div>

             </div>
             );
           })}
           </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type='text' placeholder='type message...' value={message}
            onChange={(e)=>{setMessage(e.target.value)}}
             />
            <button onClick={sendMessage}>send</button>
        </div>
    </div>
  );
}

export default Chat