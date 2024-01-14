import Board from './board';
import {P_POSITIONS, applyTransformations} from './boardValueMapping';
import {
  BOARD_COL_SIZE,
  BOARD_ROW_SIZE,
  BoardMove,
  NO_OF_BOARDS,
} from './definitions';

export function randomNumber(min = 0, max = 26) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createEmptyBoard(): Board[] {
  return Array(NO_OF_BOARDS)
    .fill(0)
    .map(() => new Board());
}

export function makeMove(move: BoardMove, boards: Board[]) {
  const boardsClone = boards.map(board => board.clone());
  const {boardIndex, x, y} = move;
  boardsClone[boardIndex].markAtPos(x, y);
  return boardsClone;
}

export function cloneBoards(boards: Board[]) {
  return boards.map(board => board.clone());
}

export function totalBoardValue(boards: Board[]) {
  const val = boards.reduce((v, board) => v * board.boardValue(), 1);
  return applyTransformations(val);
}

export function boardSize() {
  return BOARD_COL_SIZE * BOARD_ROW_SIZE;
}

export function boardIndexFromPosition(pos: number): number {
  return Math.floor(pos / boardSize());
}

export function xFromPosition(pos: number): number {
  return pos % BOARD_ROW_SIZE;
}

export function yFromPosition(pos: number): number {
  return Math.floor(pos / BOARD_COL_SIZE) % BOARD_COL_SIZE;
}

export function findNextMove(boards: Board[]): BoardMove {
  const newBoards = cloneBoards(boards);
  const randomStart = randomNumber();
  let nonDeadBoardPPositionMove: BoardMove | undefined;
  let deadBoardPPositionMove: BoardMove | undefined;
  let nonDeadBoardMove: BoardMove | undefined;
  let deadBoardMove: BoardMove | undefined;
  let position = randomStart;
  while (true) {
    let boardIndex = boardIndexFromPosition(position);
    let x = xFromPosition(position);
    let y = yFromPosition(position);
    if (newBoards[boardIndex].isMovePossible(x, y)) {
      newBoards[boardIndex].markAtPos(x, y);
      const isDead = newBoards[boardIndex].isDead();
      const isPPosition = P_POSITIONS.includes(totalBoardValue(newBoards));
      if (isPPosition) {
        if (isDead) {
          deadBoardPPositionMove = {boardIndex, x, y};
        } else {
          nonDeadBoardPPositionMove = {boardIndex, x, y};
          break;
        }
      } else {
        if (isDead) {
          deadBoardMove = {boardIndex, x, y};
        } else {
          nonDeadBoardMove = {boardIndex, x, y};
        }
      }
      newBoards[boardIndex].clearAtPos(x, y);
    }
    position = (position + 1) % (NO_OF_BOARDS * boardSize());
    if (randomStart === position) {
      break;
    }
  }

  if (nonDeadBoardPPositionMove) {
    return nonDeadBoardPPositionMove;
  }
  if (deadBoardPPositionMove) {
    return deadBoardPPositionMove;
  }
  if (nonDeadBoardMove) {
    return nonDeadBoardMove;
  }
  if (deadBoardMove) {
    return deadBoardMove;
  }

  throw new Error('Could not find any possible move');
}
