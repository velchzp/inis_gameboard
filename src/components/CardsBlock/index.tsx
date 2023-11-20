import "./CardsBlock.css";
import { Box, Button, IconButton } from "@mui/material";
import { socket } from "../../sockets/socket";
import { useEffect, useState } from "react";
import { cardActionMap } from "../../types/maps/actioncards_map";
import { IMyDeckUiInfo, IGameUiInfo, IDealCardsInfo } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { GameStage } from "../../types/Enums";
import { AppDispatch, RootState } from "../../redux/store";

import { setCardPlay } from "../../redux/slices/CardPlaySlice";

export const CardsBlock = () => {
  const [action_cards_ids, setAction_cards_ids] = useState<string[]>([]);

  const deckinfo = useSelector((state: RootState) => state.deckinfo);
  const gameInfo = useSelector((state: RootState) => state.gameinfo);
  const Dealcards = useSelector((state: RootState) => state.dealCard);
  const [cardsToDeal, setCardsToDeal] = useState<string[]>([]);
  const [cardsToDiscardNum, setcardsToDiscardNum] = useState<number>();

  const dispatch: AppDispatch = useDispatch();

  const handleCardClick = (cardClickedID: string) => {
    const clickedCard = cardActionMap.get(cardClickedID);
    console.log(cardClickedID);
    dispatch(setCardPlay({ isCardPlay: true, card: clickedCard }));
    console.log("clicked!");
  };
  const handleCardDealClick = (cardID: string) => {
    setCardsToDeal((prevSelectedCards) => [...prevSelectedCards, cardID]);
  };
  const handleConfirmButton = (cardsToDeal: string[]) => {
    socket.emit("player-card-deal", {
      cardIds: cardsToDeal,
    });
    setCardsToDeal([]);
  };

  useEffect(() => {
    // console.log(Dealcards);
    // if (gameInfo?.gameStage == GameStage.Gathering) {
    //   setAction_cards_ids(Dealcards.cardIds);
    // } else {
    setAction_cards_ids(deckinfo.ActionCards);
    // }
  });

  return (
    <div className="cards_wrapper">
      <Box className="epos_cards">{/* Epos Cards content goes here */}</Box>

      <Box className="actions_cards">
        {action_cards_ids ? (
          action_cards_ids.map((cardId, index) => (
            <IconButton
              className="card"
              onClick={() => {
                if (gameInfo?.gameStage == GameStage.Gathering) {
                  if (cardsToDeal.length == Dealcards.cardsToDiscardNum) {
                    console.log("sosi");
                  } else {
                    handleCardDealClick(cardId);
                  }
                } else {
                  handleCardClick(cardId);
                }
              }}
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
      {cardsToDeal.length == Dealcards.cardsToDiscardNum ? (
        <Button
          onClick={() => {
            handleConfirmButton(cardsToDeal);
          }}
        >
          Confirm
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};
