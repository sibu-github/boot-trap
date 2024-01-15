import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {OnOffMode, SettingsState} from '../definitions';

const initialState: SettingsState = {
  darkMode: OnOffMode.On,
  soundMode: OnOffMode.On,
  showSuggestedMove: OnOffMode.Off,
};
const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {
    updateDarkMode: (state, action: PayloadAction<OnOffMode>) => {
      state.darkMode = action.payload;
    },
    updateSoundMode: (state, action: PayloadAction<OnOffMode>) => {
      state.soundMode = action.payload;
    },
    updateShowSuggestedMove: (state, action: PayloadAction<OnOffMode>) => {
      state.showSuggestedMove = action.payload;
    },
  },
});
export const {updateDarkMode, updateSoundMode, updateShowSuggestedMove} =
  settingsSlice.actions;
export default settingsSlice;
