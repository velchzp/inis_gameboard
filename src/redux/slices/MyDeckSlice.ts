import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMyDeckUiInfo } from "../../types/types";

const initialState: IMyDeckUiInfo = {
  ActionCards: [],
  EposCards: [],
  AdvantagesCards: [],
};

const MyDeckSlice = createSlice({
  name: "MyDeck",
  initialState,
  reducers: {
    setDeck: (state: IMyDeckUiInfo, action: PayloadAction<IMyDeckUiInfo>) => {
      state.ActionCards = action.payload.ActionCards;
      state.AdvantagesCards = action.payload.AdvantagesCards;
      state.EposCards = action.payload.EposCards;
    },
  },
});

export const { setDeck } = MyDeckSlice.actions;
export default MyDeckSlice.reducer;
