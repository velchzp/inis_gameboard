import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICardParams } from "../../types/types";
import { socket } from "../../sockets/socket";

export const fetchCardInfo = createAsyncThunk(
  "cards/fetchCardInfo",
  async () => {
    return new Promise<ICardParams>((resolve) => {
      socket.on("player-card-info", (cardInfo: ICardParams) => {
        resolve(cardInfo);
      });
    });
  }
);

const initialState: ICardParams = {
  axial: undefined,
  targetPlayerId: undefined,
  axialToNum: undefined,
  targetCardId: undefined,
  CardVariation: undefined,
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCardInfo.fulfilled, (state, action) => {
      const { axial, targetPlayerId, axialToNum, targetCardId, CardVariation } =
        action.payload;
      state.axial = axial;
      state.targetPlayerId = targetPlayerId;
      state.axialToNum = axialToNum;
      state.targetCardId = targetCardId;
      state.CardVariation = CardVariation;
    });
  },
});

export default cardsSlice.reducer;
