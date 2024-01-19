import React from 'react';
import {StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR_BLACK, navigateTo} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../redux/useTypeSelectorHook';
import {
  setGameMode,
  setGameType,
  setRulesUnderstood,
} from '../../redux/gameState';
import {useSoundMode} from '../../hooks';
import {playClickOneSound} from '../../utils/sound';

function BackIcon() {
  const {rulesUnderstood, gameType, gameMode} = useAppSelector(
    state => state.gameState,
  );
  const soundMode = useSoundMode();
  const dispatch = useAppDispatch();

  const onBack = () => {
    if (soundMode) {
      playClickOneSound();
    }
    if (!rulesUnderstood) {
      navigateTo('Rules');
    }
    if (rulesUnderstood && !gameType) {
      dispatch(setRulesUnderstood(false));
    }
    if (rulesUnderstood && gameType === 'VsHuman') {
      dispatch(setGameType(undefined));
    }
    if (rulesUnderstood && gameType === 'VsComputer' && !gameMode) {
      dispatch(setGameType(undefined));
    }
    if (rulesUnderstood && gameType === 'VsComputer' && !!gameMode) {
      dispatch(setGameMode(undefined));
    }
  };

  return (
    <Ionicons
      name="arrow-back-circle-outline"
      size={40}
      color={COLOR_BLACK}
      style={styles.backIcon}
      onPress={onBack}
    />
  );
}

const styles = StyleSheet.create({
  backIcon: {
    paddingTop: 10,
    alignSelf: 'center',
  },
});

export default BackIcon;
