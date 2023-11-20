import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDealCardsInfo } from "../../types/types";

const initialState: IDealCardsInfo = {
  cardsToDiscardNum: 0,
  cardIds: [],
};

const DealCardsSlice = createSlice({
  name: "DealCard",
  initialState,
  reducers: {
    setDealCard: (
      state: IDealCardsInfo,
      action: PayloadAction<IDealCardsInfo>
    ) => {
      state.cardIds = action.payload.cardIds;
      state.cardsToDiscardNum = action.payload.cardsToDiscardNum;
    },
  },
});

export const { setDealCard } = DealCardsSlice.actions;
export default DealCardsSlice.reducer;
