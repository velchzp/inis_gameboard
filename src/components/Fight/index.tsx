import React, { useEffect, useState } from "react";
import "./Fight.css";
import { Button } from "@mui/material";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { GameStage, AttackerAction, DeffenderAction } from "../../types/Enums";
import { socket } from "../../sockets/socket";
import { IAttackerInputParams, IDeffenderInputParams } from "../../types/types";

export const Fight = () => {
  const gameInfo = useSelector((state: RootState) => state.gameinfo);
  const meinfo = useSelector((state: RootState) => state.meinfo);
  const fightInfo = useSelector((state: RootState) => state.fightinfo);
  const SideBarInfo = useSelector((state: RootState) => state.sideBar);

  const [PlayerAttackerAction, setPlayerAttackerAction] =
    useState<AttackerAction | null>(null);
  const attackerCycleInfo = useSelector(
    (state: RootState) => state.attackercycleinfo
  );
  useEffect(() => {
    console.log("Cycle from UseEffect", attackerCycleInfo);
  });

  const handleClanButton = () => {
    socket.emit("player-fight-deffender", {
      deffenderAction: DeffenderAction.Clan,
    });
  };
  const handleAttackButton = () => {
    setPlayerAttackerAction(AttackerAction.Atack);
  };
  const handleUsernameButton = (playerid: string) => {
    socket.emit("player-fight-attacker", {
      attackerAction: PlayerAttackerAction,
      targetPlayerId: playerid,
    });
    setPlayerAttackerAction(null);
  };
  return (
    <div>
      {fightInfo ? (
        fightInfo.players.map((player, index) => {
          if (player.isActive) {
            if (meinfo.id === player.playerId) {
              if (PlayerAttackerAction) {
                return (
                  <div className="fight_wrapper">
                    {fightInfo.players.map((player, index) => {
                      if (player.playerId !== meinfo.id) {
                        return (
                          <Button
                            key={index}
                            variant="contained"
                            onClick={() =>
                              handleUsernameButton(player.playerId)
                            }
                          >
                            {player.username}
                          </Button>
                        );
                      }
                      return null; // This ensures no button is rendered if the condition isn't met
                    })}
                  </div>
                );
              } else {
                return (
                  <div className="fight_wrapper">
                    <Button
                      className="attack_button"
                      variant="contained"
                      onClick={handleAttackButton}
                    >
                      Attack
                    </Button>
                    <Button className="move_button" variant="contained">
                      Move
                    </Button>
                    <Button className="epos_button" variant="contained">
                      Epos
                    </Button>
                  </div>
                );
              }
            }
          }
        })
      ) : (
        <></>
      )}
      {meinfo.id == attackerCycleInfo.defenderPlayerId ? (
        <div className="fight_wrapper">
          <Button
            className="clan_button"
            variant="contained"
            onClick={handleClanButton}
          >
            Clan
          </Button>
          <Button className="card_button" variant="contained">
            Card
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
