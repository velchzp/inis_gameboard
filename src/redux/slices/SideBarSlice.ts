import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ISidebarUiInfo } from "../../types/types"; // Убедитесь, что путь к вашему файлу с интерфейсом ISidebarUiInfo правильный
import { socket } from "../../sockets/socket";

// Определение createAsyncThunk для получения данных ISidebarUiInfo
export const fetchSidebarInfo = createAsyncThunk(
  "sidebar/fetchSidebarInfo",
  async () => {
    return new Promise<ISidebarUiInfo>((resolve) => {
      // Пример использования socket для получения данных
      socket.on("sidebar-update", (sidebarInfo: ISidebarUiInfo) => {
        resolve(sidebarInfo);
      });
    });
  }
);

// Начальное состояние для ISidebarUiInfo
const initialSidebarState: ISidebarUiInfo = {
  players: [],
  turnDirection: "",
};

// Создание slice для управления состоянием
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialSidebarState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSidebarInfo.fulfilled, (state, action) => {
      const { players, turnDirection } = action.payload;
      state.players = players;
      state.turnDirection = turnDirection;
    });
  },
});

export default sidebarSlice.reducer;
