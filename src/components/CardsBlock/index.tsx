import "./CardsBlock.css";
import { Box, IconButton } from "@mui/material";
import { socket } from "../../sockets/socket";
import { useEffect, useState } from "react";
import { cardActionMap } from "../../types/maps/actioncards_map";
import {
  Card,
  IPlayerCardInput,
  ICardParams,
  axialCoordinates,
  IMyDeckUiInfo,
} from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchHexagons } from "../../redux/slices/hexagonsSlice";
import { fetchSidebarInfo } from "../../redux/slices/SideBarSlice";
import { AppDispatch } from "../../redux/store";
import { CardPlay } from "../CardPlay";
import { setCardPlay } from "../../redux/slices/CardPlaySlice";
import { fetchCardInfo } from "../../redux/slices/CardParamsSlice";
export const CardsBlock = () => {
  const [action_cards_ids, setAction_cards_ids] = useState<string[]>([]);
  const [epos, setEpos_cards_ids] = useState<string[]>([]);
  const [adv_cards_ids, setAdv_cards_ids] = useState<string[]>([]);

  const [isCardPlay, setIsCardPlay] = useState(false);
  const [cardID, setCardID] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const handleCardClick = (cardID: string) => {
    const clickedCard = cardActionMap.get(cardID); // Get the card object
    setIsCardPlay(true);
    setCardID(cardID);
    dispatch(setCardPlay({ isCardPlay: true, card: clickedCard }));

    socket.emit("player-card-info", {
      cardId: cardID,
    });
    dispatch(fetchCardInfo());
  };

  useEffect(() => {
    socket.on("my-deck-update", (deckinfo: IMyDeckUiInfo) => {
      setAction_cards_ids(deckinfo.ActionCards);
      setEpos_cards_ids(deckinfo.EposCards);
      setAdv_cards_ids(deckinfo.AdvantagesCards);
      // console.log(deckinfo);
    });
  }, []);

  return (
    <div className="cards_wrapper">
      <Box className="epos_cards">{/* Epos Cards content goes here */}</Box>
      <Box className="actions_cards">
        {action_cards_ids ? (
          action_cards_ids.map((cardId, index) => (
            <IconButton
              className="card"
              onClick={() => handleCardClick(cardId)}
              key={cardId}
            >
              <img
                src={
                  process.env.PUBLIC_URL + cardActionMap.get(cardId)?.img_url
                }
                alt=""
                className="card_img"
                key={cardId}
              />
            </IconButton>
          ))
        ) : (
          <p>CardName</p>
        )}
      </Box>
      <Box className="advantage_cards">
        {/* Advantage Cards content goes here */}
      </Box>
      {/* {isCardPlay && card ? <CardPlay {...card}></CardPlay> : <p></p>} */}
    </div>
  );
};
