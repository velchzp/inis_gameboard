import { useState, useEffect } from "react";
import "./SideBlock.css";
import { PlayersInfo } from "../PlayersInfo";
import { socket } from "../../sockets/socket";
import { ISidebarUiInfo, Player } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const SideBlock = () => {
  const [direction, setDirection] = useState("CLOCKWISE");
  const [players, setPlayers] = useState<ISidebarUiInfo["players"]>([]);
  const SideBarInfo = useSelector((state: RootState) => state.sideBar);

  useEffect(() => {
    if (SideBarInfo) {
      setPlayers(SideBarInfo.players);
      setDirection(SideBarInfo.turnDirection);
      
    }
  });

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
