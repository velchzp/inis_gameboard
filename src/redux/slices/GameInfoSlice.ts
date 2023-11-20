import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGameUiInfo } from "../../types/types";
import { GameStage } from "../../types/Enums";

const initialState: IGameUiInfo = {
  gameStatus: false,
  maxPlayers: 0,
  citadelsLeft: 0,
  sanctuariesLeft: 0,
  gameStage: GameStage.CapitalSetup,
};

const GameInfoSlice = createSlice({
  name: "GameInfo",
  initialState,
  reducers: {
    setGameInfo: (state: IGameUiInfo, action: PayloadAction<IGameUiInfo>) => {
      state.citadelsLeft = action.payload.citadelsLeft;
      state.gameStage = action.payload.gameStage;
      state.gameStatus = action.payload.gameStatus;
      state.maxPlayers = action.payload.maxPlayers;
      state.sanctuariesLeft = action.payload.sanctuariesLeft;
    },
  },
});

export const { setGameInfo } = GameInfoSlice.actions;
export default GameInfoSlice.reducer;
