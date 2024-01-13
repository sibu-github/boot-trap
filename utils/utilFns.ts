import {Platform, ToastAndroid} from 'react-native';
import {RootStackParamList, navigationRef} from '../definitions';
import {CommonActions} from '@react-navigation/native';

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
