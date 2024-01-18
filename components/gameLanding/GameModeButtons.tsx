import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../Button';
import {useAppDispatch, useAppSelector} from '../../redux/useTypeSelectorHook';
import {setGameMode} from '../../redux/gameState';

function GameModeButtons() {
  const {rulesUnderstood, gameType, gameMode} = useAppSelector(
    state => state.gameState,
  );
  const dispatch = useAppDispatch();

  const onPracticeMode = () => dispatch(setGameMode('Practice'));
  const onChallengeMode = () => dispatch(setGameMode('Challenge'));

  if (!rulesUnderstood || !gameType || !!gameMode) {
    return false;
  }

  return (
    <>
      <Button text="Practice Mode" onClick={onPracticeMode} />
      <View style={styles.blank} />
      <Button text="Challenge Mode" onClick={onChallengeMode} />
    </>
  );
}

const styles = StyleSheet.create({
  blank: {
    height: 10,
  },
});

export default GameModeButtons;
