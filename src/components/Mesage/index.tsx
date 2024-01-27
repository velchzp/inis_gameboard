import React from "react";
import { IMessage } from "../../types/types";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import "./Message.css";
import { RootState } from "../../redux/store";

export const Message_Right = (message: IMessage) => {
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
  return (
    <div className="message_left">
      <Typography className="message-username">{message.username}</Typography>
      <Typography className="message-text-left">{message.message}</Typography>
    </div>
  );
};
