import { playerAction } from "./Enums";
import { Card_type, Timing_to_play, Badge, StartStructure } from "./Enums";

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

export type axialCoordinates = {
  q: number;
  r: number;
};

export interface Field {
  territoryId: string;
  sanctuaryCount: number;
  citadelsCount: number;
  playersClans: Map<string, number>;
  leaderPlayerId: string | null;
}

export interface IMapUiInfo {
  capital: axialCoordinates | null;
  holiday: axialCoordinates | null;
  hexGrid: {
    q: number;
    r: number;
    field: Field;
  }[];
  terLeft: number;
}
export type Territory = {
  id: string;
  title: string;
  description: string;
  cardId: string;
  startStructure?: StartStructure;
  field_color: string;
};

export interface LobbyInfo {
  status: string;
  info: {
    gameId: string;
    playerId: string;
    socket: string;
  }[];
}
