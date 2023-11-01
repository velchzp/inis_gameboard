import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "../../sockets/socket";
import { LobbyInfo } from "../../types/types";

export const fetchLobbyInfo = createAsyncThunk(
  "hexagons/fetchLobbyInfo",
  async () => {
    return new Promise<LobbyInfo>((resolve) => {
      socket.on("gameLobby-info", (lobbyInfo: LobbyInfo) => {
        resolve(lobbyInfo);
      });
    });
  }
);

const initialState: LobbyInfo = {
  status: " ",
  info: [],
};

const lobbyInfoSlice = createSlice({
  name: "lobbyInfo",
  initialState,
  reducers: {}, // You can have other synchronous reducers here if needed
  extraReducers: (builder) => {
    builder.addCase(fetchLobbyInfo.fulfilled, (state, action) => {
      const { status, info } = action.payload;
      state.status = status;
      state.info = info;
    });
  },
});

export default lobbyInfoSlice.reducer;
