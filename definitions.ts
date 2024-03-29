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
  showBoardValue: OnOffMode;
}

export type GamePage = 'Landing' | 'GameBoard';
export type GameType = 'VsComputer' | 'VsHuman';
export type GameStateState = {
  gameType: GameType | undefined;
  gamePage: GamePage | undefined;
  playerNames: string[];
  isReady: boolean;
  rulesUnderstood: boolean;
  gameMode: GameMode | undefined;
  playerOneType: PlayerType | undefined;
  playerTwoType: PlayerType | undefined;
  currentPlayer: PlayerNumber | undefined;
  player1Moves: BoardMove[];
  player2Moves: BoardMove[];
  lastMove: BoardMove | undefined;
  winner: PlayerNumber | undefined;
  boardItems: BoardItems[];
  suggestedMove: BoardMove | undefined;
  scoringMoves: BoardMove[];
};

export type GameStartPayload = {
  gameMode: GameMode;
  playerOneType: PlayerType;
  playerTwoType: PlayerType;
};

export type GameStartMultiPlayerPayload = {
  playerOneName: string;
  playerTwoName: string;
};

export type UpdateMovePayload = {
  move: BoardMove;
  newBoardItems: BoardItems[];
  player: PlayerNumber;
};

export type DeleteMovePayload = {
  newBoardItems: BoardItems[];
  newCurrentPlayer: PlayerNumber;
  newLastMove: BoardMove | undefined;
  player1MovesCopy: BoardMove[];
  player2MovesCopy: BoardMove[];
  scoringMovesCopy: BoardMove[];
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
  scoringMoves?: BoardMove[];
  winner?: PlayerNumber | undefined;
  smallBoard?: boolean;
  flipTextColor?: boolean;
  onUndo?: () => void;
};
