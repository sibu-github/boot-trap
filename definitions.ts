import {createNavigationContainerRef} from '@react-navigation/native';
import {
  BoardMove,
  Board,
  PlayerType,
  GameMode,
  PlayerNumber,
  BoardItems,
} from './lib';

export enum OnOffMode {
  Off,
  On,
}

export interface SettingsState {
  darkMode: OnOffMode;
  soundMode: OnOffMode;
  showSuggestedMove: OnOffMode;
}

type GamePage = 'Landing' | 'GameBoard';
export interface GameStateState {
  gamePage: GamePage;
  isReady: boolean;
  rulesUnderstood: boolean;
  gameMode: GameMode | undefined;
  playerOneType: PlayerType;
  playerTwoType: PlayerType;
  currentPlayer: PlayerNumber;
  player1Moves: BoardMove[];
  player2Moves: BoardMove[];
  lastMove: BoardMove | undefined;
  winner: PlayerNumber | undefined;
  boardItems: BoardItems[];
  suggestedMove: BoardMove | undefined;
  scoringMoves: BoardMove[];
}

export type GameStartPayload = {
  gameMode: GameMode;
  playerOneType: PlayerType;
  playerTwoType: PlayerType;
};

export type UpdateMovePayload = {
  move: BoardMove;
  newBoardItems: BoardItems[];
  player: PlayerNumber;
};

export type RootStackParamList = {
  Game: undefined;
  Rules: undefined;
  Settings: undefined;
  Donate: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export type BoardViewProps = {
  board: Board;
  boardIndex: number;
  player1Moves: BoardMove[];
  player2Moves: BoardMove[];
  lastMove: BoardMove | undefined;
  suggestedMove?: BoardMove;
  onPress: (move: BoardMove) => void;
  smallBoard?: boolean;
  flipTextColor?: boolean;
};

export type GameMovesProps = {
  player1Moves: BoardMove[];
  player2Moves: BoardMove[];
  smallBoard?: boolean;
  flipTextColor?: boolean;
};
