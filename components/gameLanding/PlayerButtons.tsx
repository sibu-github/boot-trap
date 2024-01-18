import React from 'react';
import {StyleSheet, View} from 'react-native';
import {KALAM_BOLD, PLAYER_1_COLOR, PLAYER_2_COLOR} from '../../utils';
import Button from '../Button';
import {PlayerType} from '../../lib';
import {startPlay} from '../../redux/gameState';
import {useAppDispatch, useAppSelector} from '../../redux/useTypeSelectorHook';

function PlayerButtons() {
  const {gameType, gameMode, rulesUnderstood} = useAppSelector(
    state => state.gameState,
  );
  const dispatch = useAppDispatch();

  const onPlayAsPlayer1 = () => {
    if (!gameMode) {
      return;
    }
    dispatch(
      startPlay({
        gameMode,
        playerOneType: PlayerType.Human,
        playerTwoType: PlayerType.Computer,
      }),
    );
  };
  const onPlayAsPlayer2 = () => {
    if (!gameMode) {
      return;
    }
    dispatch(
      startPlay({
        gameMode,
        playerOneType: PlayerType.Computer,
        playerTwoType: PlayerType.Human,
      }),
    );
  };

  if (!rulesUnderstood || gameType !== 'VsComputer' || !gameMode) {
    return false;
  }

  return (
    <>
      <Button
        text="Play As Player 1"
        onClick={onPlayAsPlayer1}
        textStyle={styles.player1Btn}
      />
      <View style={styles.blank} />
      <Button
        text="Play As Player 2"
        onClick={onPlayAsPlayer2}
        textStyle={styles.player2Btn}
      />
    </>
  );
}

const styles = StyleSheet.create({
  player1Btn: {
    color: PLAYER_1_COLOR,
    fontFamily: KALAM_BOLD,
  },
  player2Btn: {
    color: PLAYER_2_COLOR,
    fontFamily: KALAM_BOLD,
  },
  blank: {
    height: 10,
  },
});

export default PlayerButtons;
