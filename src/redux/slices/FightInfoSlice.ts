import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFightUiInfo } from "../../types/types";

const initialState: IFightUiInfo = {
  fightHex: null,
  players: [],
};

const FightInfoSlice = createSlice({
  name: "Fight",
  initialState,
  reducers: {
    setFightInfo: (
      state: IFightUiInfo,
      action: PayloadAction<IFightUiInfo>
    ) => {
      state.fightHex = action.payload.fightHex;
      state.players = action.payload.players;
    },
  },
});

export const { setFightInfo } = FightInfoSlice.actions;
export default FightInfoSlice.reducer;
