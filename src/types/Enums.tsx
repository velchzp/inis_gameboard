export enum playerAction {
  None = "NONE",
  Card = "CARD",
  Token = "TOKEN",
  Pass = "PASS",
}

export enum Card_type {
  Action,
  Epos,
  Advantage,
}
export enum Timing_to_play {
  Season,
  SeasonX2,
  Trixel,
  TrixelX2,
  SeasonOrTrixel,
}
export enum Badge {
  Build,
  Clans,
  Move,
  Attack,
  MoveAndAttack,
  None,
}
export enum StartStructure {
  Shrine,
}
export enum CardParams {
  axial,
  singleAxial,
  targetPlayerId,
  axialToNum,
  targetCardId,
  cardVariation,
}
export enum GameStage {
  CapitalSetup = "CAPITAL_SETUP",
  ClansSetup = "CLANS_SETUP",
  Gathering = "GATHERING",
  Season = "SEASON",
  Fight = "FIGHT",
  END = "END",
  PAUSE = "PAUSE",
}

export enum PretenderTokenType {
  Clans = "CLANS",
  Sanctuaries = "SAN",
  Territories = "TER",
}
export enum AttackerAction {
  Atack = "ATACK",
  Move = "MOVE",
  Epos = "EPOS",
}
export enum DeffenderAction {
  Clan = "CLAN",
  Card = "CARD",
}
export enum Color {
  red = "RED",
  green = "GREEN",
  blue = "BLUE",
  yellow = "YELLOW",
  purple = "PURPLE",
  orange = "ORANGE",
}
