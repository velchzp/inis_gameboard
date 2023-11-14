import { useEffect } from "react";
import "./Board.css";
import { SideBlock } from "../../components/SideBlock";
import { HexGrid } from "../../components/HexGrid";
import { CardsBlock } from "../../components/CardsBlock";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CardPlay } from "../../components/CardPlay";

export const Board = () => {
  const { isCardPlay, card } = useSelector(
    (state: RootState) => state.cardPlay
  );
  window.scrollTo(2700, 3300);
  useEffect(() => {
    // window.scrollTo(2700, 3400);
    // console.log(isCardPlay);
    // console.log(card);
  });

  return (
    <div className="body">
      <HexGrid />
      <div className="sideblock">
        <SideBlock />
      </div>
      <div className="cards_block">
        <CardsBlock />
      </div>
    </div>
  );
};
