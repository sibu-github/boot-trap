import {GameType, OnOffMode} from './definitions';
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

export function useSoundMode() {
  const {soundMode} = useAppSelector(state => state.settings);
  return soundMode === OnOffMode.On;
}

export function isSuggestion(
  gameType: GameType | undefined,
  showSuggestedMove: OnOffMode,
) {
  return gameType === 'VsComputer' && showSuggestedMove === OnOffMode.On;
}

export function useShowSuggestedMove() {
  const {showSuggestedMove} = useAppSelector(state => state.settings);
  const {gameType} = useAppSelector(state => state.gameState);
  return isSuggestion(gameType, showSuggestedMove);
}

export function useShowBoardValue() {
  const {showBoardValue} = useAppSelector(state => state.settings);
  return showBoardValue === OnOffMode.On;
}
