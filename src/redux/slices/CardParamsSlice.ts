import { createSlice } from "@reduxjs/toolkit";
import { ICardOperationResponse } from "../../types/types";

const initialState: ICardOperationResponse = {
  axial: [],
  cardIds: [],
  maxTerClicks: 0,
  maxCardClicks: 0,
  maxTargetPlayerClicks: 0,
  axialToNum: [],
  axialToPlayerId: [],
  moveData: [],
};

const cardsParamsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCardParams: (state, action) => {
      state.axial = action.payload.axial;
      state.axialToNum = action.payload.axialToNum;
      state.axialToPlayerId = action.payload.axialToPlayerId;
      state.cardIds = action.payload.cardIds;
      state.maxCardClicks = action.payload.maxCardClicks;
      state.maxTargetPlayerClicks = action.payload.maxTargetPlayerClicks;
      state.maxTerClicks = action.payload.maxTerClicks;
      state.moveData = action.payload.moveData;
    },
  },
});

export const { setCardParams } = cardsParamsSlice.actions;
export default cardsParamsSlice.reducer;
