import React from "react";
import { Route, Routes } from "react-router-dom";
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

function App() {
  const dispatch: AppDispatch = useDispatch();
  const gameInfo = useSelector((state: RootState) => state.gameinfo);

  useEffect(() => {
    socket.on("connect", () => {
      // console.log(socket.id);
    });

    socket.emit(
      "game-join",
      "54a94296-eb0b-45dc-a6f6-544559cf6b8b",
      "6553995defc2b3f2962ef65d"
    );
    socket.emit("sidebar-update");
    socket.emit("my-deck-update");
    socket.emit("map-update");
    socket.emit("allPlayers-info");
    socket.emit("game-update");

    // if (gameInfo?.gameStage == GameStage.Gathering) {
    //   socket.emit("dealCards-update");
    // }

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
    // socket.on("dealCards-update", (data) => {
    //   dispatch(setDealCard(data));
    //   console.log(data);
    // });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Board />}></Route>
      </Routes>
    </div>
  );
}

export default App;
