import {
  playerAction,
  GameStage,
  PretenderTokenType,
  AttackerAction,
  DeffenderAction,
} from "./Enums";
import {
  Card_type,
  Timing_to_play,
  Badge,
  StartStructure,
  CardParams,
} from "./Enums";

export interface Player {
  id: string;
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
    id: string;
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
  params?: CardParams[];
};

export type axialCoordinates = {
  q: number;
  r: number;
};

export interface IField {
  territoryId: string;
  sanctuaryCount: number;
  citadelsCount: number;
  leaderPlayerId: string | null;
  playerClans: {
    [k: string]: number;
  };
}

export interface IMapUiInfo {
  capital: axialCoordinates | null;
  holiday: axialCoordinates | null;
  hexGrid: {
    q: number;
    r: number;
    field: IField;
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

export interface IMeUiInfo {
  id: string;
  username: string;
  mmr: number;
  color?: string;
  isActive?: boolean;
}

export interface IPlayersUiInfo {
  players: {
    id: string;
    username: string;
    mmr: number;
    color?: string;
  }[];
}

export interface AxialToNum {
  axial: axialCoordinates;
  num: number;
}
export interface ICardParams {
  axial?: axialCoordinates[];
  singleAxial?: axialCoordinates;
  targetPlayerId?: string;
  axialToNum?: { axial: axialCoordinates; num: number }[];
  targetCardId?: string;
  cardVariation?: number;
}

export interface ICardOperationResponse {
  axial?: axialCoordinates[];
  cardIds?: string[];
  maxTerClicks?: number;
  maxCardClicks?: number;
  maxTargetPlayerClicks?: number;
  axialToNum?: { axial: axialCoordinates; num: number }[];
  axialToPlayerId?: {
    axialCoordinates: axialCoordinates;
    playerIds: string[];
  }[];
  moveData?: {
    singleAxial: axialCoordinates;
    axialToNum: { axial: axialCoordinates; num: number }[];
  }[];
}
export interface IPlayerCardInput {
  cardId: string;
  params?: ICardParams;
}

export interface IPlayCard {
  isCardPlay: boolean;
  card: Card | null;
}
export interface IGameUiInfo {
  gameStatus: boolean;
  maxPlayers: number;
  citadelsLeft: number;
  sanctuariesLeft: number;
  gameStage: GameStage;
}
export interface IDealCardsInfo {
  cardsToDiscardNum: number;
  cardIds: string[];
}
export interface IPlayerCardDealInput {
  cardIds: string[];
}
export interface IMeUiInfo {
  id: string;
  username: string;
  mmr: number;
  color?: string;
}
export interface IPretenderTokenInput {
  type: PretenderTokenType;
}

export interface IFightUiInfo {
  fightHex: axialCoordinates | null;
  players: {
    playerId: string;
    clansNum: number;
    peace: boolean;
    isActive: boolean;
    username: string;
  }[];
}
export interface IAttackCycleUiInfo {
  status: boolean;
  attackerPlayerId: string | null;
  defenderPlayerId: string | null;
}
export interface IAttackerInputParams {
  attackerAction: AttackerAction;
  axial?: axialCoordinates;
  targetPlayerId?: string;
  clansNum?: number;
}
export interface IDeffenderInputParams {
  deffenderAction: DeffenderAction;
  cardId?: string;
}
