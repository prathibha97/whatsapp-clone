import React from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";

function Chat({ messages }) {
  return (
    <div className='chat'>
      <div className='chat_header'>
        <Avatar />
        <div className='chat_headerInfo'>
          <h3>Room Name</h3>
          <p>Last seen ...</p>
        </div>
        <div className='chat_headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='chat_body'>
        {messages.map((message) => (
          <p className={`chat_message ${message.received && "chat_receiver"}`}>
            <span className='chat_name'>{message.name}</span>
            {message.message}
            <span className='chat_timestamp'>{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className='chat_footer'>
        <InsertEmoticon />
        <form>
          <input type='text' placeholder='Type a message' />
          <button type='submit'>Send message</button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
