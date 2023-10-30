import React from "react";
import { Route, Routes } from "react-router-dom";
import { socket } from "./sockets/socket";
import { useEffect } from "react";
import { Board } from "./pages/Board";

function App() {
  useEffect(() => {
    socket.emit(
      "game-join",
      "54a94296-eb0b-45dc-a6f6-544559cf6b8b",
      "6dd6246a-f15b-43f8-bd67-5a38aa91184e"
    );
    socket.emit("sidebar-update");
    socket.emit("my-deck-update");
  }, []);

  socket.on("gameLobby-info", (info) => {
    console.log(info);
  });
  socket.on("connect", () => {
    console.log(socket.id);
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Board />}></Route>
      </Routes>
    </div>
  );
}

export default App;
