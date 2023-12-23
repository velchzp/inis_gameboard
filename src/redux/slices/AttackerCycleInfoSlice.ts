import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAttackCycleUiInfo } from "../../types/types";

const initialState: IAttackCycleUiInfo = {
  status: false,
  attackerPlayerId: null,
  defenderPlayerId: null,
};

const AttackerCycleInfo = createSlice({
  name: "AttackerCycleInfo",
  initialState,
  reducers: {
    setAttackerCycleInfo: (
      state: IAttackCycleUiInfo,
      action: PayloadAction<IAttackCycleUiInfo>
    ) => {
      state.status = action.payload.status;
      state.attackerPlayerId = action.payload.attackerPlayerId;
      state.defenderPlayerId = action.payload.defenderPlayerId;
    },
  },
});

export const { setAttackerCycleInfo } = AttackerCycleInfo.actions;
export default AttackerCycleInfo.reducer;
