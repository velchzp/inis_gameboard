import { useEffect } from "react";
import "./Board.css";
import { SideBlock } from "../../components/SideBlock";
import { HexGrid } from "../../components/HexGrid";
import { CardsBlock } from "../../components/CardsBlock";
import { Typography } from "@mui/material";

export const Board = () => {
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
