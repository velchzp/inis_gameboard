import React from "react";
import "./CardsBlock.css";
import { Box } from "@mui/material";
import { socket } from "../../sockets/socket";
import { useEffect } from "react";
import { IMyDeckUiInfo } from "../../types/types";

export const CardsBlock = () => {
  useEffect(() => {
    socket.on("my-deck-update", (deckinfo: IMyDeckUiInfo) => {
      console.log(deckinfo);
    });
  }, []);
  return (
    <div className="cards_wrapper">
      <Box className="epos_cards">
        <img
          src={process.env.PUBLIC_URL + "/epos.png"}
          alt=""
          className="card"
          id="card_epos"
        />
        <img
          src={process.env.PUBLIC_URL + "/epos.png"}
          alt=""
          className="card"
          id="card_epos"
        />
        <img
          src={process.env.PUBLIC_URL + "/epos.png"}
          alt=""
          className="card"
          id="card_epos"
        />
        <img
          src={process.env.PUBLIC_URL + "/epos.png"}
          alt=""
          className="card"
          id="card_epos"
        />
        <img
          src={process.env.PUBLIC_URL + "/epos.png"}
          alt=""
          className="card"
          id="card_epos"
        />
        <img
          src={process.env.PUBLIC_URL + "/epos.png"}
          alt=""
          className="card"
          id="card_epos"
        />
      </Box>
      <Box className="actions_cards">
        <img
          src={process.env.PUBLIC_URL + "/action.png"}
          alt=""
          className="card"
        />
        <img
          src={process.env.PUBLIC_URL + "/action.png"}
          alt=""
          className="card"
        />
        <img
          src={process.env.PUBLIC_URL + "/action.png"}
          alt=""
          className="card"
        />
        <img
          src={process.env.PUBLIC_URL + "/action.png"}
          alt=""
          className="card"
        />
      </Box>
      <Box className="advantage_cards">
        <img
          src={process.env.PUBLIC_URL + "/advantage.png"}
          alt=""
          className="card"
          id="card_adv"
        />
        <img
          src={process.env.PUBLIC_URL + "/advantage.png"}
          alt=""
          className="card"
          id="card_adv"
        />
        <img
          src={process.env.PUBLIC_URL + "/advantage.png"}
          alt=""
          className="card"
          id="card_adv"
        />
      </Box>
    </div>
  );
};
