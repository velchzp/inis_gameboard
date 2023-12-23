import React from "react";
import "./Fight.css";
import { Button } from "@mui/material";
export const Fight = () => {
  return (
    <div>
      <div className="fight_wrapper">
        <Button className="attack_button" variant="contained">
          Attack
        </Button>
        <Button className="move_button" variant="contained">
          Move
        </Button>
        <Button className="epos_button" variant="contained">
          Epos
        </Button>
      </div>
    </div>
  );
};
