import {Platform, ToastAndroid} from 'react-native';
import {RootStackParamList, navigationRef} from '../definitions';
import {CommonActions} from '@react-navigation/native';
import {BOARD_COL_SIZE, BoardMove} from '../lib';
import {COL_MARKERS, ROW_MARKERS} from '.';

const TOAST_MESSAGE_DURATION = 2000;

export async function showMessage(msg: string, duration?: number) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, duration || TOAST_MESSAGE_DURATION);
  }
}

export function navigateTo(
  routeName: keyof RootStackParamList,
  params?: object,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
}

export function translateBoardMove(move: BoardMove) {
  const idx = move.boardIndex * BOARD_COL_SIZE + move.y;
  return `${ROW_MARKERS[idx]}${COL_MARKERS[move.x]}`;
}
