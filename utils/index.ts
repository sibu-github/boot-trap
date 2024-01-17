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
  'The game starts with three boards.',
  'Both of the players enter "X".',
  'You may choose to make a move on any of the boards.',
  'Once a line with three "X"s is made on any board, only that particular board is marked as dead.',
  'The game continues on the other non-dead boards.',
  'Whoever makes three "X"s in a line on the last board, loses the game.',
  'Your strategy should be to force your opponent to make three "X"s in a line on the last board.',
];

export const SMALL_BOARD_CELL_SIZE = 20;
export const BIG_BOARD_CELL_SIZE = 60;
export const SMALL_BOARD_TXT_SIZE = 10;
export const BIG_BOARD_TXT_SIZE = 30;
export const BOT_MOVE_TIMEOUT = 500;
