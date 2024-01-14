import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {GameStartPayload, GameStateState} from '../definitions';
import {PlayerType} from '../lib';

const initialState: GameStateState = {
  gamePage: 'Landing',
  gameMode: 'Challenge',
  playerOneType: PlayerType.Human,
  playerTwoType: PlayerType.Computer,
};
const gameStateSlice = createSlice({
  name: 'gameStateSlice',
  initialState,
  reducers: {
    startPlay: (state, action: PayloadAction<GameStartPayload>) => {
      state.gamePage = 'GameBoard';
      state.gameMode = action.payload.gameMode;
      state.playerOneType = action.payload.playerOneType;
      state.playerTwoType = action.payload.playerTwoType;
    },
  },
});
export const {startPlay} = gameStateSlice.actions;
export default gameStateSlice;
