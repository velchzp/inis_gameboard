import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { socket } from "./sockets/socket";
import { useEffect } from "react";
import { Board } from "./pages/Board";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import { setDeck } from "./redux/slices/MyDeckSlice";
import { setHexagons } from "./redux/slices/hexagonsSlice";
import { setSidebar } from "./redux/slices/SideBarSlice";
import { setCardParams } from "./redux/slices/CardParamsSlice";
import { setGameInfo } from "./redux/slices/GameInfoSlice";
import { GameStage } from "./types/Enums";
import { setDealCard } from "./redux/slices/DealCardsSlice";
import { setMeInfo } from "./redux/slices/MeInfoSlice";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const gameInfo = useSelector((state: RootState) => state.gameinfo);

  useEffect(() => {
    
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/:id" element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;
