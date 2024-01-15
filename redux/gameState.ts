import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  GameStartPayload,
  GameStateState,
  UpdateMovePayload,
} from '../definitions';
import {
  PlayerNumber,
  PlayerType,
  createEmptyBoardItems,
  findNextMove,
  isGameFinished,
  makeMove,
} from '../lib';
import {AppThunk} from './store';
import {BOT_MOVE_TIMEOUT} from '../utils';
import {playClickTwoSound} from '../utils/sound';

const initialState: GameStateState = {
  gamePage: 'Landing',
  isReady: false,
  gameMode: 'Challenge',
  playerOneType: PlayerType.Human,
  playerTwoType: PlayerType.Computer,
  currentPlayer: 'one',
  player1Moves: [],
  player2Moves: [],
  lastMove: undefined,
  winner: undefined,
  boardItems: [],
};

export const computerMoveThunk = (): AppThunk => async (dispatch, getState) => {
  const {gameMode, playerOneType, boardItems} = getState().gameState;
  const {soundMode} = getState().settings;
  const move = findNextMove(boardItems, gameMode);
  const newBoards = makeMove(move, boardItems);
  const newBoardItems = newBoards.map(b => b.items);
  const player: PlayerNumber =
    playerOneType === PlayerType.Computer ? 'one' : 'two';
  await new Promise(resolve => setTimeout(resolve, BOT_MOVE_TIMEOUT));
  if (soundMode) {
    playClickTwoSound();
  }
  await dispatch(updateMove({move, newBoardItems, player}));
};

const gameStateSlice = createSlice({
  name: 'gameStateSlice',
  initialState,
  reducers: {
    startPlay: (state, action: PayloadAction<GameStartPayload>) => {
      state.gamePage = 'GameBoard';
      state.isReady = false;
      state.gameMode = action.payload.gameMode;
      state.playerOneType = action.payload.playerOneType;
      state.playerTwoType = action.payload.playerTwoType;
    },
    newGame: state => {
      state.isReady = true;
      state.currentPlayer = 'one';
      state.player1Moves = [];
      state.player2Moves = [];
      state.lastMove = undefined;
      state.winner = undefined;
      state.boardItems = createEmptyBoardItems();
    },
    updateMove: (state, action: PayloadAction<UpdateMovePayload>) => {
      if (action.payload.player === 'one') {
        state.player1Moves.push(action.payload.move);
      } else {
        state.player2Moves.push(action.payload.move);
      }
      state.lastMove = action.payload.move;
      const finished = isGameFinished(action.payload.newBoardItems);
      if (finished) {
        state.winner = state.currentPlayer === 'one' ? 'two' : 'one';
      }
      state.currentPlayer = state.currentPlayer === 'one' ? 'two' : 'one';
      state.boardItems = action.payload.newBoardItems;
    },
  },
});

export const {startPlay, newGame, updateMove} = gameStateSlice.actions;
export default gameStateSlice;
