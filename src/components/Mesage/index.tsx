import React, { useState } from "react";
import { IMessage } from "../../types/types";
import { Typography, Button } from "@mui/material";
import { RootState } from "../../redux/store";
import "./Message.css";
import { socket } from "../../sockets/socket";

export const Message_Right = (message: IMessage) => {
  const [showMuteButton, setShowMuteButton] = useState(false);

  return (
    <div className="message_right">
      <div className="orange_text">
        <Typography className="message-username">{message.username}</Typography>{" "}
        <Typography className="message-text-right">
          {message.message}
        </Typography>
      </div>
    </div>
  );
};

export const Message_Left = (message: IMessage) => {
  const [showMuteButton, setShowMuteButton] = useState(false);

  const toggleMuteButton = () => {
    setShowMuteButton(!showMuteButton);
  };

  const handleMutePlayerButton = (PlayerId: string) => {

    socket.emit("mute-unmute", { targetPlayerId: PlayerId });

    toggleMuteButton();
  };

  return (
    <div className="message_left" onClick={toggleMuteButton}>
      <Typography className="message-username">{message.username}</Typography>
      <Typography className="message-text-left">{message.message}</Typography>
      {showMuteButton && (
        <Button
          variant="outlined"
          onClick={() => {
            handleMutePlayerButton(message.userId);
          }}
          style={{ height: 30, color: "red" }}
        >
          Mute Player
        </Button>
      )}
    </div>
  );
};
