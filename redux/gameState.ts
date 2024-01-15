import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  GameStartPayload,
  GameStateState,
  OnOffMode,
  UpdateMovePayload,
} from '../definitions';
import {
  BoardMove,
  GameMode,
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
  rulesUnderstood: false,
  isReady: false,
  gameMode: undefined,
  playerOneType: PlayerType.Human,
  playerTwoType: PlayerType.Computer,
  currentPlayer: 'one',
  player1Moves: [],
  player2Moves: [],
  lastMove: undefined,
  winner: undefined,
  boardItems: [],
  suggestedMove: undefined,
  scoringMoves: [],
};

export const computerMoveThunk = (): AppThunk => async (dispatch, getState) => {
  const {gameMode, playerOneType, boardItems} = getState().gameState;
  const {soundMode, showSuggestedMove} = getState().settings;
  dispatch(updateSuggestedMove(undefined));
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
  if (gameMode === 'Practice' || showSuggestedMove === OnOffMode.On) {
    let suggestedMove: BoardMove | undefined;
    if (!isGameFinished(newBoardItems)) {
      suggestedMove = findNextMove(newBoardItems);
    }
    dispatch(updateSuggestedMove(suggestedMove));
  }
};

const gameStateSlice = createSlice({
  name: 'gameStateSlice',
  initialState,
  reducers: {
    setRulesUnderstood: state => {
      state.rulesUnderstood = true;
      state.gameMode = undefined;
      state.isReady = false;
    },
    setGameMode: (state, action: PayloadAction<GameMode>) => {
      state.gameMode = action.payload;
      state.isReady = false;
    },
    resetGame: state => {
      state.gameMode = undefined;
      state.isReady = false;
      state.lastMove = undefined;
      state.winner = undefined;
      state.suggestedMove = undefined;
      state.scoringMoves = [];
      state.gamePage = 'Landing';
    },
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
      state.suggestedMove = undefined;
      state.scoringMoves = [];
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
    updateSuggestedMove: (
      state,
      action: PayloadAction<BoardMove | undefined>,
    ) => {
      state.suggestedMove = action.payload;
    },
    updateScoringMove: (state, action: PayloadAction<BoardMove>) => {
      state.scoringMoves.push(action.payload);
    },
  },
});

export const {
  setRulesUnderstood,
  setGameMode,
  resetGame,
  startPlay,
  newGame,
  updateMove,
  updateSuggestedMove,
  updateScoringMove,
} = gameStateSlice.actions;
export default gameStateSlice;
