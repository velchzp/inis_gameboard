import { createSlice } from "@reduxjs/toolkit";
import { Card, IPlayCard } from "../../types/types";
import { AttackerAction, DeffenderAction } from "../../types/Enums";

const initialState = {
  action: null,
};

const FightActionSlice = createSlice({
  name: "FightAction",
  initialState,
  reducers: {
    setAction: (state, action) => {
      state.action = action.payload;
    },
  },
});

export const { setAction } = FightActionSlice.actions;
export default FightActionSlice.reducer;
