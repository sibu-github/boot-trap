import {createNavigationContainerRef} from '@react-navigation/native';
import {BoardMove, Board, PlayerType} from './lib';

export enum OnOffMode {
  Off,
  On,
}

export interface SettingsState {
  darkMode: OnOffMode;
  soundMode: OnOffMode;
}

type GamePage = 'Landing' | 'GameBoard';
export interface GameStateState {
  gamePage: GamePage;
  gameMode: GameMode;
  playerOneType: PlayerType;
  playerTwoType: PlayerType;
}

export type GameStartPayload = {
  gameMode: GameMode;
  playerOneType: PlayerType;
  playerTwoType: PlayerType;
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

export type GameMode = 'Practice' | 'Challenge';
export type PlayerNumber = 'one' | 'two';
