import { createSlice } from "@reduxjs/toolkit";
import { Card, IPlayCard } from "../../types/types";

const initialState: IPlayCard = {
  isCardPlay: false,
  card: null,
};

const cardPlaySlice = createSlice({
  name: "cardPlay",
  initialState,
  reducers: {
    setCardPlay: (state, action) => {
      state.isCardPlay = action.payload.isCardPlay;
      state.card = action.payload.card;
    },
  },
});

export const { setCardPlay } = cardPlaySlice.actions;
export default cardPlaySlice.reducer;
