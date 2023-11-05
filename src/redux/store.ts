// store.ts
import { configureStore } from "@reduxjs/toolkit";
import hexagonsReducer from "./slices/hexagonsSlice";
import lobbyInfoReducer from "./slices/LobbyInfoSlice";
import SideBarSlice from "./slices/SideBarSlice";

export const store = configureStore({
  reducer: {
    hexagons: hexagonsReducer,
    lobbyInfo: lobbyInfoReducer,
    sideBar: SideBarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
