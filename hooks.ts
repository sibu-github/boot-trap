import {OnOffMode} from './definitions';
import {useAppSelector} from './redux/useTypeSelectorHook';
import {COLOR_BLACK, COLOR_WHITE} from './utils';

export function useTextColor() {
  const {darkMode} = useAppSelector(state => state.settings);
  const txtColor = darkMode === OnOffMode.On ? COLOR_WHITE : COLOR_BLACK;
  return txtColor;
}

export function useBackgroundColor() {
  const {darkMode} = useAppSelector(state => state.settings);
  const bgColor = darkMode === OnOffMode.On ? COLOR_BLACK : COLOR_WHITE;
  return bgColor;
}
