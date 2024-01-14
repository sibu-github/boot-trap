import {COLOR_RED, COLOR_VIOLET} from './colors';

export * from './colors';
export * from './fonts';
export * from './utilFns';

export const UPI_ID = 'Q921982347@ybl';
export const PLAYER_1_COLOR = COLOR_RED;
export const PLAYER_2_COLOR = COLOR_VIOLET;

export const ROW_MARKERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
export const COL_MARKERS = ['1', '2', '3'];

export const RULES_LIST = [
  'Both players enter "X".',
  'Game starts with 3 boards.',
  'You can choose to make a move on any board.',
  'Once a 3"X" in a line is made on any board then only that particular board is marked as dead.',
  'Play continues on other non dead boards.',
  'Whoever makes 3"X" in a line on the last board, looses the game.',
  'As a player your strategy should be to force your opponent to make 3"X" in a line on the last board.',
];

export const SMALL_BOARD_CELL_SIZE = 20;
export const BIG_BOARD_CELL_SIZE = 60;
export const SMALL_BOARD_TXT_SIZE = 10;
export const BIG_BOARD_TXT_SIZE = 30;
