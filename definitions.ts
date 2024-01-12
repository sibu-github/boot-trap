import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export enum OnOffMode {
  Off,
  On,
}

export interface SettingsState {
  darkMode: OnOffMode;
  soundMode: OnOffMode;
}

export type RootStackParamList = {
  Game: undefined;
  Rules: undefined;
  Settings: undefined;
  Donate: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigateTo(
  routeName: keyof RootStackParamList,
  params?: object,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
}
