import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { Player } from "../../types/types";
import "./PlayersInfo.css";

export const PlayersInfo = (props: Player) => {
 
  return (
    <div className={`playerblock ${props.isActive ? "activePlayerClass" : ""}`}>
      <Box className="nicknamebox">
        <Stack className="nickname_stack">
          <PersonIcon
            style={{ height: 21, border: `2px solid ${props.color}` }}
            className="personicon"
          />

          <Typography className="nickname">{props.username}</Typography>
        </Stack>
        <Stack className="nickname_stack">
          {props.isBren ? (
            <Typography className="bren_text">Bren</Typography>
          ) : (
            <p></p>
          )}
          {props.tokens.pretender > 0 ? (
            <Typography className="challenger_text">Pretender</Typography>
          ) : (
            <p></p>
          )}
        </Stack>
      </Box>
      <hr className="line"></hr>
      <Box className="cardsbox">
        <Stack className="eposcard_stack">
          <Typography className="eposcard_number" style={{ color: "white" }}>
            {props.deck.Epos}
          </Typography>
          <Typography className="eposcard_text">Epos</Typography>
        </Stack>
        <Stack className="eposcard_stack">
          <Typography className="actioncard_number" style={{ color: "white" }}>
            {props.deck.Action}
          </Typography>
          <Typography className="eposcard_text">Action</Typography>
        </Stack>
        <Stack className="eposcard_stack">
          <Typography className="advantcard_number">
            {props.deck.Advantage}
          </Typography>
          <Typography className="eposcard_text">Adv.</Typography>
        </Stack>
        <Stack className="eposcard_stack">
          <div className="clans_number_container">
            <Typography className="clans_number">{props.clans}</Typography>
          </div>
          <Typography className="eposcard_text">Clans</Typography>
        </Stack>

        <Stack className="eposcard_stack">
          <Typography className="deed_number">{props.tokens.deed}</Typography>
          <Typography className="eposcard_text">Deed</Typography>
        </Stack>
      </Box>
    </div>
  );
};
