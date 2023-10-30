import { playerAction } from "./Enums";
import { Card_type, Timing_to_play, Badge } from "./Enums";

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

export type Card = {
  id: string;
  title: string;
  card_type: Card_type;
  timing: Timing_to_play;
  badge: Badge;
  description?: string;
  trixelCondition?: string;
  secondDescription?: string;
  img_url?: string;
};
