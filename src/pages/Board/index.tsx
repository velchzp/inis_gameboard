import { useEffect } from "react";
import "./Board.css";
import { SideBlock } from "../../components/SideBlock";
import { HexGrid } from "../../components/HexGrid";
import { CardsBlock } from "../../components/CardsBlock";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { socket } from "../../sockets/socket";
import { IPretenderTokenInput } from "../../types/types";
import { GameStage, PretenderTokenType } from "../../types/Enums";
import { useParams } from "react-router-dom";
import { setHexagons } from "../../redux/slices/hexagonsSlice";
import { setSidebar } from "../../redux/slices/SideBarSlice";
import { setCardParams } from "../../redux/slices/CardParamsSlice";
import { setGameInfo } from "../../redux/slices/GameInfoSlice";
import { setDeck } from "../../redux/slices/MyDeckSlice";
import { setDealCard } from "../../redux/slices/DealCardsSlice";
import { setMeInfo, setIsActive } from "../../redux/slices/MeInfoSlice";
import { setFightInfo } from "../../redux/slices/FightInfoSlice";
import { Fight } from "../../components/Fight";
import { setAttackerCycleInfo } from "../../redux/slices/AttackerCycleInfoSlice";
import { Chat } from "../../components/Chat";

export const Board = () => {
  const dispatch: AppDispatch = useDispatch();
  const gameInfo = useSelector((state: RootState) => state.gameinfo);
  const meinfo = useSelector((state: RootState) => state.meinfo);
  const fightInfo = useSelector((state: RootState) => state.fightinfo);
  const attackerCycleInfo = useSelector(
    (state: RootState) => state.attackercycleinfo
  );
  const { id } = useParams();
  useEffect(() => {
    socket.on("connect", () => {});

    socket.emit("game-join", id, localStorage.getItem("token"));

    socket.emit("sidebar-update");
    socket.emit("my-deck-update");
    socket.emit("map-update");
    socket.emit("allPlayers-info");
    socket.emit("game-update");
    socket.emit("me-info");
    socket.emit("is-active");
    socket.emit("all-messages");

    socket.on("map-update", (data) => {
      dispatch(setHexagons(data));
    });
    socket.on("sidebar-update", (data) => {
      dispatch(setSidebar(data));
    });
    socket.on("player-card-info", (cardInfo) => {
      dispatch(setCardParams(cardInfo));
    });
    socket.on("game-update", (data) => {
      dispatch(setGameInfo(data));
    });
    socket.on("my-deck-update", (deckinfo) => {
      dispatch(setDeck(deckinfo));
    });
    socket.on("dealCards-update", (data) => {
      dispatch(setDealCard(data));
    });
    socket.on("me-info", (data) => {
      dispatch(setMeInfo(data));
    });
    socket.on("is-active", (data) => {
      dispatch(setIsActive(data.isActive));
    });
    socket.on("fight-update", (data) => {
      dispatch(setFightInfo(data));
    });
    socket.on("attackCycle-update", (data) => {
      dispatch(setAttackerCycleInfo(data));
    });
  }, []);
  const { isCardPlay, card } = useSelector(
    (state: RootState) => state.cardPlay
  );
  window.scrollTo(2700, 3300);
  useEffect(() => {});
  const handleNextTurnClick = () => {
    socket.emit("next-turn");
    socket.emit("sidebar-update");
  };
  const handlePauseClick = () => {
    socket.emit("pause");
  };
  const handlePassClick = () => {
    socket.emit("player-pass");
    socket.emit("sidebar-update");
  };
  const handleGetTokenClick = () => {
    socket.emit("player-token", {
      type: PretenderTokenType.Sanctuaries,
    });
  };
  const handleBacktomenuClick = () => {
    window.location.href = "http://localhost:4444";
  };
  return (
    <div className="body">
      <HexGrid />
      {gameInfo.gameStage === GameStage.END ? (
        <div className="gameover-container">
          <div className="gameover-text">
            <Typography variant="h3" style={{ color: "white" }}>
              Game Over
            </Typography>
          </div>
          <div className="back-to-menu">
            <Button
              variant="contained"
              className="Pass_button"
              onClick={handleBacktomenuClick}
            >
              Back to menu
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="sideblock">
            {/* <div className="sideblock_text">
              <Typography style={{ color: "white" }}>
                Username: {meinfo.username}
              </Typography>
              <Typography style={{ color: "white" }}>
                Game stage: {gameInfo.gameStage}
              </Typography>
              <Typography style={{ color: "white" }}>
                UserID: {meinfo.id}
              </Typography>
            </div> */}
            <div className="sideblock_2">
              <SideBlock />
              <Button
                variant="contained"
                className="Pass_button"
                onClick={handlePassClick}
              >
                Pass
              </Button>
              {/* <Button variant="contained" onClick={handleNextTurnClick}>
                Next turn
              </Button> */}
              <Button
                variant="contained"
                onClick={handlePauseClick}
                className="Pass_button"
              >
                Pause
              </Button>
              <Button
                variant="contained"
                className="Pass_button"
                onClick={handleGetTokenClick}
              >
                Get Sanctuary Token
              </Button>
            </div>
          </div>
          <div className="cards_block">
            <CardsBlock />
          </div>
          {gameInfo.gameStage === GameStage.Fight ? (
            <div className="fight_block">
              {fightInfo ? (
                fightInfo.players.map((player, index) => {
                  if (player.isActive) {
                    if (meinfo.id == player.playerId) {
                      return <Fight key={index} />;
                    }
                  }
                })
              ) : (
                <></>
              )}
              {meinfo.id == attackerCycleInfo.defenderPlayerId ? (
                <Fight />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          {gameInfo.gameStage === GameStage.PAUSE ? (
            <div className="gameover-container">
              <div className="gameover-text">
                <Typography variant="h3" style={{ color: "white" }}>
                  Pause
                </Typography>
              </div>
              <div className="back-to-menu">
                <Button
                  variant="contained"
                  className="Pass_button"
                  onClick={handlePauseClick}
                >
                  Continue
                </Button>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="chat">
            <Chat />
          </div>
        </div>
      )}
    </div>
  );
};
