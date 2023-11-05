import { IMeUiInfo } from "../types";
const player1: IMeUiInfo = {
  id: "6dd6246a-f15b-43f8-bd67-5a38aa91184e",
  username: "username1",
  mmr: 1223,
};

export const playersMap: Map<string, IMeUiInfo> = new Map([
  [player1.id, player1],
]);
