import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMeUiInfo } from "../../types/types";

const initialState: IMeUiInfo = {
  id: "",
  username: "",
  mmr: 0,
};

const MeInfoSlice = createSlice({
  name: "MeInfo",
  initialState,
  reducers: {
    setMeInfo: (state: IMeUiInfo, action: PayloadAction<IMeUiInfo>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.mmr = action.payload.mmr;
    },
  },
});

export const { setMeInfo } = MeInfoSlice.actions;
export default MeInfoSlice.reducer;
