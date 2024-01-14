import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import settingsSlice from './settings';
import gameStateSlice from './gameState';

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    gameState: gameStateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
