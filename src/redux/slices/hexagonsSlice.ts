import { createSlice } from "@reduxjs/toolkit";
import { IMapUiInfo } from "../../types/types";

const initialState: IMapUiInfo = {
  capital: null,
  holiday: null,
  terLeft: 0,
  hexGrid: [],
};

const hexagonsSlice = createSlice({
  name: "hexagons",
  initialState,
  reducers: {
    setHexagons: (state, action) => {
      state.capital = action.payload.capital;
      state.hexGrid = action.payload.hexGrid;
      state.holiday = action.payload.holiday;
      state.terLeft = action.payload.terLeft;
    },
  },
});
export const { setHexagons } = hexagonsSlice.actions;
export default hexagonsSlice.reducer;
