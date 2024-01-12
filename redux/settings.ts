import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {OnOffMode, SettingsState} from '../definitions';

const initialState: SettingsState = {
  darkMode: OnOffMode.On,
  soundMode: OnOffMode.On,
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
  },
});
export const {updateDarkMode, updateSoundMode} = settingsSlice.actions;
export default settingsSlice;
