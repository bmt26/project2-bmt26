import io from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';
import { ListItem } from './ListItem.js';
import { SwitchDisplay } from './UpdateDisplay.js';

const socket = io(); // Connects to socket connection

export function Chat(props) {
  const [messages, setMessages] = useState([]); // State variable, list of messages
  const inputRef = useRef(null); // Reference to <input> element

  function onClickButton() {
    if (inputRef != null) {
      const message = inputRef.current.value;
      setMessages(prevMessages => [...prevMessages, "<you>:" + message]);
      socket.emit('chat', { username: props.username, message: message });
    }
  }

  useEffect(() => {
    socket.on('chat', (data) => {
      console.log('Chat event received!');
      console.log(data);
      setMessages(prevMessages => [...prevMessages, "<"+data.username+">: "+data.message]);
    });
  
  socket.on('logoutSuccess', (data) => {
      console.log('Logout event received!');
      setMessages(prevMessages => [...prevMessages, "User <"+data.username+"> has logged out."]);
      if(props.username==data.username){
        SwitchDisplay(false, "null");
      }
    });
    
  socket.on('logoutFailed', (data) => {
      if(props.username==data.username){
        console.log('Logout event failed!');
      }
    });
    
  socket.on('print', (data) => {
      console.log('Chat event received!');
      console.log(data);
      setMessages(prevMessages => [...prevMessages, data]);
    });
    
  socket.on('alertWin', (data) => {
      console.log('Win event received!');
      setMessages(prevMessages => [...prevMessages, "Player "+data.face+" has Won!"]);
    });
    
    
  }, []);

  return (
    <div>
      <h1>Chat Messages</h1>
      Enter message here: <input ref={inputRef} type="text" />
      <button onClick={onClickButton}>Send</button>
      <ul>
        {messages.map((item, index) => <ListItem key={index} name={item} />)}
      </ul>
    </div>
  );
}