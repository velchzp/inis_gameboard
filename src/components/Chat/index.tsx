import React, { useState, useEffect } from "react";
import { socket } from "../../sockets/socket";
import { IMessage } from "../../types/types";
import { Message_Right, Message_Left } from "../Mesage";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "./Chat.css";

export const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const meinfo = useSelector((state: RootState) => state.meinfo);
  useEffect(() => {
    socket.on("all-messages", (message) => {
      setMessages(message);
   
    });
    socket.on("new-message", (message) => {
      setMessages((prevMessage) => [...prevMessage, message]);
     
    });
  }, []);
  const sendMessage = () => {
  
    socket.emit("send-message", { message: messageText });
  };
  return (
    <div className="chat">
      <div className="messages">
        {messages.map((message, index) =>
          message.userId === meinfo.id ? (
            <Message_Right key={index} {...message} />
          ) : (
            <Message_Left key={index} {...message} />
          )
        )}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
