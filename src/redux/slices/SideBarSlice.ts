import { createSlice } from "@reduxjs/toolkit";
import { ISidebarUiInfo } from "../../types/types";

const initialSidebarState: ISidebarUiInfo = {
  players: [],
  turnDirection: "",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialSidebarState,
  reducers: {
    setSidebar: (state, action) => {
      state.players = action.payload.players;
      state.turnDirection = action.payload.turnDirection;
    },
  },
});

export const { setSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
