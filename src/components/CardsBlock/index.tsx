import React from "react";
import "./CardsBlock.css";
import { Box } from "@mui/material";
import { socket } from "../../sockets/socket";
import { useEffect, useState } from "react";
import { IMyDeckUiInfo } from "../../types/types";
import { cardActionMap } from "../../types/cards_map";
import { Card } from "../../types/types";

export const CardsBlock = () => {
  const [action_cards_ids, setAction_cards_ids] = useState<string[]>([]);
  const [epos, setEpos_cards_ids] = useState<string[]>([]);
  const [adv_cards_ids, setAdv_cards_ids] = useState<string[]>([]);

  useEffect(() => {
    socket.on("my-deck-update", (deckinfo: IMyDeckUiInfo) => {
      setAction_cards_ids(deckinfo.ActionCards);
      setEpos_cards_ids(deckinfo.EposCards);
      setAdv_cards_ids(deckinfo.AdvantagesCards);
    });
  }, []);
  console.log(action_cards_ids);
  console.log(cardActionMap.get(action_cards_ids[0]));
  return (
    <div className="cards_wrapper">
      <Box className="epos_cards">
        {/* <img
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
        /> */}
      </Box>
      <Box className="actions_cards">
        {action_cards_ids ? (
          action_cards_ids
            .slice(0, action_cards_ids.length)
            .map((card, index) => (
              <img
                src={
                  process.env.PUBLIC_URL +
                  cardActionMap.get(action_cards_ids[index])?.img_url
                }
                alt=""
                className="card"
                key={action_cards_ids[index]}
              />
            ))
        ) : (
          <p>CardName</p>
        )}
      </Box>
      <Box className="advantage_cards">
        {/* <img
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
        /> */}
      </Box>
    </div>
  );
};
