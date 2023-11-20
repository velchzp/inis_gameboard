// store.ts
import { configureStore } from "@reduxjs/toolkit";
import hexagonsReducer from "./slices/hexagonsSlice";
import SideBarSlice from "./slices/SideBarSlice";
import CardPlaySlice from "./slices/CardPlaySlice";
import cardsReducer from "./slices/CardParamsSlice";
import GameInfoSlice from "./slices/GameInfoSlice";
import MyDeckSlice from "./slices/MyDeckSlice";
import DealCardsSlice from "./slices/DealCardsSlice";

export const store = configureStore({
  reducer: {
    hexagons: hexagonsReducer,
    sideBar: SideBarSlice,
    cardPlay: CardPlaySlice,
    cards: cardsReducer,
    gameinfo: GameInfoSlice,
    deckinfo: MyDeckSlice,
    dealCard: DealCardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
