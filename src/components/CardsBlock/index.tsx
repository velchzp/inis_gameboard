import "./CardsBlock.css";
import { Box, Button, IconButton } from "@mui/material";
import { socket } from "../../sockets/socket";
import { useEffect, useState } from "react";
import { cardActionMap } from "../../types/maps/actioncards_map";
import { IMyDeckUiInfo, IGameUiInfo, IDealCardsInfo } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { GameStage, DeffenderAction } from "../../types/Enums";
import { AppDispatch, RootState } from "../../redux/store";

import { setCardPlay } from "../../redux/slices/CardPlaySlice";
import { setAction } from "../../redux/slices/FightActionSlice";

export const CardsBlock = () => {
  const [action_cards_ids, setAction_cards_ids] = useState<string[]>([]);

  const deckinfo = useSelector((state: RootState) => state.deckinfo);
  const gameInfo = useSelector((state: RootState) => state.gameinfo);
  const Dealcards = useSelector((state: RootState) => state.dealCard);
  const PlayerAttackerAction = useSelector(
    (state: RootState) => state.fightaction.action
  );
  const [cardsToDeal, setCardsToDeal] = useState<string[]>([]);
  const [cardsToDiscardNum, setcardsToDiscardNum] = useState<number>();

  const dispatch: AppDispatch = useDispatch();

  const handleCardClick = (cardClickedID: string) => {
    if (PlayerAttackerAction === DeffenderAction.Card) {
      socket.emit("player-fight-deffender", {
        deffenderAction: DeffenderAction.Card,
        cardId: cardClickedID,
      });
      dispatch(setAction(null));
    } else {
      if (gameInfo.gameStage != GameStage.PAUSE) {
        const clickedCard = cardActionMap.get(cardClickedID);
        dispatch(setCardPlay({ isCardPlay: true, card: clickedCard }));
      }
    }
  };
  const handleCardDealClick = (cardID: string) => {
    if (gameInfo.gameStage != GameStage.PAUSE) {
      setCardsToDeal((prevSelectedCards) => [...prevSelectedCards, cardID]);
    } else {
      console.log("GameStage is Pause");
    }
  };
  const handleConfirmButton = (cardsToDeal: string[]) => {
    socket.emit("player-card-deal", {
      cardIds: cardsToDeal,
    });
    setCardsToDeal([]);
  };
  useEffect(() => {
    if (gameInfo?.gameStage == GameStage.Gathering) {
      socket.emit("dealCards-update");
    }
  }, [gameInfo, Dealcards]);
  useEffect(() => {
    if (gameInfo?.gameStage == GameStage.Gathering) {
      setAction_cards_ids(Dealcards.cardIds);
      setcardsToDiscardNum(Dealcards.cardsToDiscardNum);
    } else {
      setAction_cards_ids(deckinfo.ActionCards);
    }
  }, [Dealcards, gameInfo, deckinfo]);

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
                  if (cardsToDeal.length == cardsToDiscardNum) {
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
      {cardsToDeal.length == cardsToDiscardNum ? (
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
