import Board from './board';
import {P_POSITIONS, applyTransformations} from './boardValueMapping';
import {
  BOARD_COL_SIZE,
  BOARD_ROW_SIZE,
  BoardItems,
  BoardMove,
  GameMode,
  NO_OF_BOARDS,
  PlayerNumber,
  PlayerType,
} from './definitions';

export function randomNumber(min = 0, max = 26) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createEmptyBoardItems(): BoardItems[] {
  return Array(NO_OF_BOARDS)
    .fill(0)
    .map(() => new Board().items);
}

export function isUserMove(
  currentPlayer: PlayerNumber,
  playerOneType: PlayerType,
  playerTwoType: PlayerType,
): boolean {
  return (
    (currentPlayer === 'one' && playerOneType === PlayerType.Human) ||
    (currentPlayer === 'two' && playerTwoType === PlayerType.Human)
  );
}
export function isComputerMove(
  currentPlayer: PlayerNumber,
  playerOneType: PlayerType,
  playerTwoType: PlayerType,
): boolean {
  return (
    (currentPlayer === 'one' && playerOneType === PlayerType.Computer) ||
    (currentPlayer === 'two' && playerTwoType === PlayerType.Computer)
  );
}

export function isGameFinished(boardItems: BoardItems[]) {
  const boards = boardItems.map(item => new Board(item));
  return boards.length !== 0 && boards.every(board => board.isDead());
}

export function makeMove(move: BoardMove, boardItems: BoardItems[]) {
  const boardsClone = boardItems.map(item => new Board(item));
  const {boardIndex, x, y} = move;
  boardsClone[boardIndex].markAtPos(x, y);
  return boardsClone;
}

export function clearMove(move: BoardMove, boardItems: BoardItems[]) {
  const boardsClone = boardItems.map(item => new Board(item));
  const {boardIndex, x, y} = move;
  boardsClone[boardIndex].clearAtPos(x, y);
  return boardsClone;
}

export function cloneBoards(boards: Board[]) {
  return boards.map(board => board.clone());
}

export function totalBoardValue(boards: Board[]) {
  const val = boards.reduce((v, board) => v * board.boardValue().value, 1);
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

export function isPPositionMove(boards: Board[]) {
  return P_POSITIONS.includes(totalBoardValue(boards));
}

export function findNextMove(
  boardItems: BoardItems[],
  gameMode?: GameMode,
): BoardMove {
  if (gameMode === 'Practice') {
    return findNextMovePractice(boardItems);
  }
  const newBoards = boardItems.map(item => new Board(item));
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
      const isPPosition = isPPositionMove(newBoards);
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

export function findNextMovePractice(boardItems: BoardItems[]): BoardMove {
  const newBoards = boardItems.map(item => new Board(item));
  const randomStart = randomNumber();
  let position = randomStart;
  let possibleMove: BoardMove | undefined;
  while (true) {
    let boardIndex = boardIndexFromPosition(position);
    let x = xFromPosition(position);
    let y = yFromPosition(position);
    if (newBoards[boardIndex].isMovePossible(x, y)) {
      newBoards[boardIndex].markAtPos(x, y);
      const isDead = newBoards[boardIndex].isDead();
      if (!isDead) {
        return {boardIndex, x, y};
      }
      possibleMove = {boardIndex, x, y};
      newBoards[boardIndex].clearAtPos(x, y);
    }
    position = (position + 1) % (NO_OF_BOARDS * boardSize());
    if (randomStart === position) {
      break;
    }
  }
  if (possibleMove) {
    return possibleMove;
  }

  throw new Error('Could not find any possible move');
}
