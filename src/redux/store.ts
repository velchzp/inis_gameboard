// store.ts
import { configureStore } from "@reduxjs/toolkit";
import hexagonsReducer from "./slices/hexagonsSlice";

export const store = configureStore({
  reducer: {
    hexagons: hexagonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
