import "./CardsBlock.css";
import { Box, Button, IconButton } from "@mui/material";
import { socket } from "../../sockets/socket";
import { useEffect, useState } from "react";
import { cardActionMap } from "../../types/maps/actioncards_map";
import { IMyDeckUiInfo, IGameUiInfo, IDealCardsInfo } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { GameStage } from "../../types/Enums";
import { AppDispatch } from "../../redux/store";

import { setCardPlay } from "../../redux/slices/CardPlaySlice";
import { fetchCardInfo } from "../../redux/slices/CardParamsSlice";

export const CardsBlock = () => {
  const [action_cards_ids, setAction_cards_ids] = useState<string[]>([]);
  const [epos, setEpos_cards_ids] = useState<string[]>([]);
  const [adv_cards_ids, setAdv_cards_ids] = useState<string[]>([]);
  const [gameInfo, setGameInfo] = useState<IGameUiInfo>();
  const [isCardPlay, setIsCardPlay] = useState(false);
  const [cardID, setCardID] = useState<string>("");
  const [cardsToDeal, setCardsToDeal] = useState<string[]>([]);
  const [cardsToDiscardNum, setcardsToDiscardNum] = useState<number>();

  const dispatch: AppDispatch = useDispatch();

  const handleCardClick = (cardID: string) => {
    const clickedCard = cardActionMap.get(cardID);
    setIsCardPlay(true);
    setCardID(cardID);
    dispatch(setCardPlay({ isCardPlay: true, card: clickedCard }));
    socket.emit("player-card-info", {
      cardId: cardID,
    });
    dispatch(fetchCardInfo());
    console.log("clicked!");
  };
  const handleCardDealClick = (cardID: string) => {
    console.log(cardID);
    setCardsToDeal((prevSelectedCards) => [...prevSelectedCards, cardID]);
    console.log("clicked2!");
  };
  const handleConfirmButton = (cardsToDeal: string[]) => {
    console.log(cardsToDeal);
    socket.emit("player-card-deal", {
      cardIds: cardsToDeal,
    });
  };

  useEffect(() => {
    socket.on("game-update", (data) => {
      setGameInfo(data);
    });
    if (gameInfo?.gameStage == GameStage.Gathering) {
      socket.emit("dealCards-update");
    }
  });

  useEffect(() => {
    console.log(gameInfo);
    if (gameInfo?.gameStage == GameStage.Gathering) {
      socket.on("dealCards-update", (data: IDealCardsInfo) => {
        setAction_cards_ids(data.cardIds);
        setcardsToDiscardNum(data.cardsToDiscardNum);
      });
    } else {
      socket.on("my-deck-update", (deckinfo: IMyDeckUiInfo) => {
        setAction_cards_ids(deckinfo.ActionCards);
        setEpos_cards_ids(deckinfo.EposCards);
        setAdv_cards_ids(deckinfo.AdvantagesCards);
        // console.log(deckinfo);
      });
    }
  }, [gameInfo]);

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
                  handleCardClick(cardID);
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
