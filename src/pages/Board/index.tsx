import { useEffect } from "react";
import "./Board.css";
import { SideBlock } from "../../components/SideBlock";
import { HexGrid } from "../../components/HexGrid";
import { CardsBlock } from "../../components/CardsBlock";
import { Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { socket } from "../../sockets/socket";
import { IPretenderTokenInput } from "../../types/types";
import { PretenderTokenType } from "../../types/Enums";

export const Board = () => {
  const gameInfo = useSelector((state: RootState) => state.gameinfo);
  const meinfo = useSelector((state: RootState) => state.meinfo);

  useEffect(() => {});
  const { isCardPlay, card } = useSelector(
    (state: RootState) => state.cardPlay
  );
  window.scrollTo(2700, 3300);
  useEffect(() => {});
  const handleNextTurnClick = () => {
    socket.emit("next-turn");
    socket.emit("sidebar-update");
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
  return (
    <div className="body">
      <HexGrid />
      <div className="sideblock">
        <div className="sideblock_text">
          <Typography style={{ color: "white" }}>
            Username: {meinfo.username}
          </Typography>
          <Typography style={{ color: "white" }}>
            Game stage: {gameInfo.gameStage}
          </Typography>
        </div>
        <div className="sideblock_2">
          <SideBlock />
          <Button
            variant="contained"
            className="Pass_button"
            onClick={handlePassClick}
          >
            Pass
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
        <Button variant="contained" onClick={handleNextTurnClick}>
          Next turn
        </Button>
        <CardsBlock />
      </div>
    </div>
  );
};
