import React, {useCallback, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_LIGHT_YELLOW,
  KALAM_BOLD,
  KALAM_REGULAR,
  PLAYER_1_COLOR,
  PLAYER_2_COLOR,
  navigateTo,
} from '../utils';
import Button from './Button';
import {GameMode} from '../definitions';
import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch} from '../redux/useTypeSelectorHook';
import {startPlay} from '../redux/gameState';
import {PlayerType} from '../lib';

const GAME_LANDING_IMAGE = '../images/game_landing.png';

function GameLanding() {
  const [understood, setUserstood] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode | undefined>();
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      setUserstood(false);
      setGameMode(undefined);
    }, []),
  );

  const onShowMeRules = () => navigateTo('Rules');
  const onUnderstood = () => setUserstood(true);
  const onPracticeMode = () => setGameMode('Practice');
  const onChallengeMode = () => setGameMode('Challenge');
  const onPlayAsPlayer1 = () => {
    console.log('play as player 1');
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
    console.log('play as player 2');
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

  return (
    <View style={styles.container}>
      <Image source={require(GAME_LANDING_IMAGE)} style={styles.img} />
      <Text style={styles.didYouUnderstand}>Did you understand the rules?</Text>
      <Text style={styles.notATicTacToe}>This is not a Tic-Tac-Toe</Text>
      <View style={styles.btnWrapper}>
        {!understood && (
          <>
            <Button text="Show Me Rules" onClick={onShowMeRules} />
            <View style={styles.blank} />
            <Button text="Yes, I understood Rules" onClick={onUnderstood} />
          </>
        )}
        {understood && !gameMode ? (
          <>
            <Button text="Practice Mode" onClick={onPracticeMode} />
            <View style={styles.blank} />
            <Button text="Challenge Mode" onClick={onChallengeMode} />
          </>
        ) : (
          <></>
        )}
        {understood && gameMode && (
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
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_LIGHT_YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  img: {
    width: '100%',
  },
  blank: {
    height: 10,
  },
  didYouUnderstand: {
    color: COLOR_BLACK,
    fontFamily: KALAM_REGULAR,
    fontSize: 18,
    position: 'absolute',
    top: 10,
  },
  notATicTacToe: {
    color: COLOR_BLACK,
    fontFamily: KALAM_BOLD,
    fontSize: 24,
    position: 'absolute',
    top: 50,
    textDecorationLine: 'underline',
    width: 200,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  btnWrapper: {
    position: 'absolute',
    top: '70%',
  },
  player1Btn: {
    color: PLAYER_1_COLOR,
    fontFamily: KALAM_BOLD,
  },
  player2Btn: {
    color: PLAYER_2_COLOR,
    fontFamily: KALAM_BOLD,
  },
});

export default GameLanding;