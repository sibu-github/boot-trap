export const BOARD_ROW_SIZE = 3;
export const BOARD_COL_SIZE = 3;
export const MARKER_CHAR = 'X';
export const NO_OF_BOARDS = 3;

export enum MisereQuotient {
  'one' = 1,
  'a' = 2,
  'b' = 3,
  'c' = 5,
  'd' = 7,
}

export type ValueMapping = {
  indexes: number[][];
  value: MisereQuotient;
  symbol: string;
};

export enum PlayerType {
  Human = 1,
  Computer = 2,
}

export type BoardItems = string[][];

export type BoardMove = {
  boardIndex: number;
  x: number;
  y: number;
};

export type PlayerNumber = 'one' | 'two';
export type GameMode = 'Practice' | 'Challenge';

export enum DeadBoardLineType {
  HorizontalOne = 1,
  HorizontalTwo = 2,
  HorizontalThree = 3,
  VerticalOne = 4,
  VerticalTwo = 5,
  VerticalThree = 6,
  DiagonalOne = 7,
  DiagonalTwo = 8,
}

export const SUPERSCRIPTS_CHARS = [
  '⁰',
  '¹',
  '²',
  '³',
  '⁴',
  '⁵',
  '⁶',
  '⁷',
  '⁸',
  '⁹',
];
