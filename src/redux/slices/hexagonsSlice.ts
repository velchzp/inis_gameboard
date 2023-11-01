import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HexagonState } from "../../types/types";
import { IMapUiInfo } from "../../types/types";
import { socket } from "../../sockets/socket";

export const fetchHexagons = createAsyncThunk(
  "hexagons/fetchHexagons",
  async () => {
    return new Promise<IMapUiInfo["hexGrid"]>((resolve) => {
      socket.on("map-update", (mapInfo: IMapUiInfo) => {
        resolve(mapInfo.hexGrid);
      });
    });
  }
);

const initialState: HexagonState = {
  hexagons: [],
};

const hexagonsSlice = createSlice({
  name: "hexagons",
  initialState,
  reducers: {}, // You can have other synchronous reducers here if needed
  extraReducers: (builder) => {
    builder.addCase(fetchHexagons.fulfilled, (state, action) => {
      state.hexagons = action.payload;
    });
  },
});

export default hexagonsSlice.reducer;
