import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IMapUiInfo } from "../../types/types";
import { socket } from "../../sockets/socket";

export const fetchHexagons = createAsyncThunk(
  "hexagons/fetchHexagons",
  async () => {
    return new Promise<IMapUiInfo>((resolve) => {
      socket.on("map-update", (mapInfo: IMapUiInfo) => {
        resolve(mapInfo);
      });
    });
  }
);

const initialState: IMapUiInfo = {
  capital: null,
  holiday: null,
  terLeft: 0,
  hexGrid: [],
};

const hexagonsSlice = createSlice({
  name: "hexagons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHexagons.fulfilled, (state, action) => {
      const { capital, holiday, terLeft, hexGrid } = action.payload;
      state.capital = capital;
      state.holiday = holiday;
      state.terLeft = terLeft;
      state.hexGrid = hexGrid;
    });
  },
});

export default hexagonsSlice.reducer;
