import {OnOffMode} from './definitions';
import {useAppSelector} from './redux/useTypeSelectorHook';
import {COLOR_BLACK, COLOR_WHITE} from './utils';

export function useTextColor(flipTextColor?: boolean) {
  const {darkMode} = useAppSelector(state => state.settings);
  if (flipTextColor) {
    return darkMode === OnOffMode.On ? COLOR_BLACK : COLOR_WHITE;
  }
  return darkMode === OnOffMode.On ? COLOR_WHITE : COLOR_BLACK;
}

export function useBackgroundColor() {
  const {darkMode} = useAppSelector(state => state.settings);
  const bgColor = darkMode === OnOffMode.On ? COLOR_BLACK : COLOR_WHITE;
  return bgColor;
}
