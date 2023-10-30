import { playerAction } from "./Enums";

export interface Player {
  username: string;
  mmr: number;
  deck: {
    Epos: number;
    Action: number;
    Advantage: number;
  };
  clans: number;
  tokens: {
    deed: number;
    pretender: number;
  };
  isBren: boolean;
  isActive: boolean;
  lastAction: playerAction;
}

export interface ISidebarUiInfo {
  players: {
    username: string;
    mmr: number;
    deck: {
      Epos: number;
      Action: number;
      Advantage: number;
    };
    clans: number;
    tokens: {
      deed: number;
      pretender: number;
    };
    isBren: boolean;
    isActive: boolean;
    lastAction: playerAction;
  }[];
  turnDirection: string;
}

export interface IMyDeckUiInfo {
  ActionCards: string[];
  EposCards: string[];
  AdvantagesCards: string[];
}
