import {createNavigationContainerRef} from '@react-navigation/native';

export enum OnOffMode {
  Off,
  On,
}

export interface SettingsState {
  darkMode: OnOffMode;
  soundMode: OnOffMode;
}

export type RootStackParamList = {
  Game: undefined;
  Rules: undefined;
  Settings: undefined;
  Donate: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export type BoardMove = {
  boardIndex: number;
  x: number;
  y: number;
};

export type BoardContent = string[][];

export type BoardProps = {
  content: BoardContent;
  boardIndex: number;
  player1Moves: BoardMove[];
  player2Moves: BoardMove[];
};
