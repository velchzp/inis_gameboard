import { useEffect } from "react";
import "./Board.css";
import { SideBlock } from "../../components/SideBlock";
import { HexGrid } from "../../components/HexGrid";
import { CardsBlock } from "../../components/CardsBlock";
import { Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CardPlay } from "../../components/CardPlay";
import { socket } from "../../sockets/socket";

export const Board = () => {
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
  return (
    <div className="body">
      <HexGrid />
      <div className="sideblock">
        <SideBlock />
        <Button
          variant="contained"
          className="Pass_button"
          onClick={handlePassClick}
        >
          Pass
        </Button>
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
