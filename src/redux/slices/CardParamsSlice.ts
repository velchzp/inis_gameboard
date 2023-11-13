import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICardParams, ICardOperationResponse } from "../../types/types";
import { socket } from "../../sockets/socket";

export const fetchCardInfo = createAsyncThunk(
  "cards/fetchCardInfo",
  async () => {
    return new Promise<ICardOperationResponse>((resolve) => {
      socket.on("player-card-info", (cardInfo: ICardOperationResponse) => {
        resolve(cardInfo);
      });
    });
  }
);

const initialState: ICardOperationResponse = {
  axial: [],
  cardIds: [],
  maxTerClicks: 0,
  maxCardClicks: 0,
  maxTargetPlayerClicks: 0,
  axialToNum: [],
  axialToPlayerId: [],
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCardInfo.fulfilled, (state, action) => {
      const {
        axial,
        cardIds,
        maxCardClicks,
        maxTerClicks,
        maxTargetPlayerClicks,
        axialToNum,
        axialToPlayerId,
      } = action.payload;
      state.axial = axial;
      state.axialToPlayerId = axialToPlayerId;
      state.axialToNum = axialToNum;
      state.maxCardClicks = maxCardClicks;
      state.maxTerClicks = maxTerClicks;
      state.maxTargetPlayerClicks = maxTargetPlayerClicks;
      state.cardIds = cardIds;
    });
  },
});

export default cardsSlice.reducer;
