import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMeUiInfo } from "../../types/types";

const initialState: IMeUiInfo = {
  id: "",
  username: "",
  mmr: 0,
  isActive: false,
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
    setIsActive: (state: IMeUiInfo, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
  },
});

export const { setMeInfo, setIsActive } = MeInfoSlice.actions;
export default MeInfoSlice.reducer;
