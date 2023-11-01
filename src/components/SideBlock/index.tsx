import React, { useState, useEffect } from "react";
import "./SideBlock.css";
import { PlayersInfo } from "../PlayersInfo";
import { socket } from "../../sockets/socket";
import { ISidebarUiInfo, Player } from "../../types/types";

export const SideBlock = () => {
  const [direction, setDirection] = useState("CLOCKWISE");
  const [players, setPlayers] = useState<ISidebarUiInfo["players"]>([]);

  useEffect(() => {
    socket.on("sidebar-update", (data: ISidebarUiInfo) => {
      setPlayers(data.players);
      setDirection(data.turnDirection);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("sidebar-update");
    };
  }, []);

  return (
    <div className="wrapper">
      {direction === "CLOCKWISE" ? (
        <img src={process.env.PUBLIC_URL + "/arrow-39658_640.png"} alt="" />
      ) : (
        <img src={process.env.PUBLIC_URL + "/arrow_up.png"} alt="" />
      )}
      <div className="players">
        {players ? (
          players
            .slice(0, 4)
            .map((player: Player, index) => (
              <PlayersInfo key={index} {...player} />
            ))
        ) : (
          <div>Waiting for player data...</div>
        )}
      </div>
    </div>
  );
};
