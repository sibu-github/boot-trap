import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  COLOR_BLACK,
  COLOR_OVERLAY_DARK,
  KALAM_BOLD,
  KALAM_REGULAR,
} from '../utils';
import {useAppDispatch, useAppSelector} from '../redux/useTypeSelectorHook';
import {PlayerType} from '../lib';
import {playGameOverSound, playGameWinSound} from '../utils/sound';
import Button from './Button';
import {newGame, resetGame} from '../redux/gameState';

function GameWinner() {
  const {winner, playerOneType, scoringMoves} = useAppSelector(
    state => state.gameState,
  );
  const {soundMode} = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();

  const isGameWin = useCallback(() => {
    return (
      (winner === 'one' && playerOneType === PlayerType.Human) ||
      (winner === 'two' && playerOneType === PlayerType.Computer)
    );
  }, [playerOneType, winner]);

  useEffect(() => {
    if (!winner) {
      return;
    }
    if (soundMode) {
      if (isGameWin()) {
        playGameWinSound();
      } else {
        playGameOverSound();
      }
    }
  }, [isGameWin, soundMode, winner]);

  const playAgain = () => dispatch(newGame());
  const resetOptions = () => dispatch(resetGame());

  if (!winner) {
    return;
  }
  return (
    <View style={styles.container}>
      {isGameWin() ? (
        <>
          <MaterialCommunityIcons
            name="hand-clap"
            size={50}
            color={COLOR_BLACK}
          />
          <Text style={styles.txtMsg}>Congratulations!! You've won.</Text>
        </>
      ) : (
        <>
          <Entypo name="emoji-sad" size={50} color={COLOR_BLACK} />
          <Text style={styles.txtMsg}>Sorry!! You've lost.</Text>
        </>
      )}
      <Text style={styles.scoreTxt}>Score: {scoringMoves.length}</Text>
      <View style={styles.btnWrapper}>
        <Button
          text="Play Again"
          onClick={playAgain}
          style={styles.playAgainBtn}
        />
        <Button
          text="Reset Options"
          onClick={resetOptions}
          style={styles.resetBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_OVERLAY_DARK,
    height: 250,
    width: '100%',
    position: 'absolute',
    bottom: 3,
    alignItems: 'center',
  },
  txtMsg: {
    fontFamily: KALAM_REGULAR,
    fontSize: 24,
    color: COLOR_BLACK,
  },
  scoreTxt: {
    fontFamily: KALAM_BOLD,
    fontSize: 20,
    color: COLOR_BLACK,
  },
  btnWrapper: {
    marginTop: 'auto',
    paddingBottom: 5,
  },
  playAgainBtn: {
    width: 125,
  },
  resetBtn: {
    marginTop: 5,
  },
});

export default GameWinner;
