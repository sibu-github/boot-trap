import React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import {useAppSelector} from '../redux/useTypeSelectorHook';
import {PlayerNumber} from '../definitions';
import {PlayerType} from '../lib';
import {
  COLOR_YELLOW,
  KALAM_REGULAR,
  PLAYER_1_COLOR,
  PLAYER_2_COLOR,
} from '../utils';
import {StyleProp} from 'react-native';

type PlayerProps = {
  currentPlayer: PlayerNumber;
};

function PlayerInfo(props: PlayerProps) {
  const {playerOneType, playerTwoType} = useAppSelector(
    state => state.gameState,
  );

  const underlineStyle: StyleProp<TextStyle> = {
    borderBottomWidth: 1,
    borderColor: COLOR_YELLOW,
  };
  const playerOneStyle: StyleProp<TextStyle> =
    props.currentPlayer === 'one' ? underlineStyle : {};
  const playerTwoStyle: StyleProp<TextStyle> =
    props.currentPlayer === 'two' ? underlineStyle : {};
  return (
    <View style={styles.container}>
      <Text style={[styles.player1, playerOneStyle]}>
        Player 1: {playerOneType === PlayerType.Human ? 'You' : 'Computer'}
      </Text>
      <Text style={[styles.player2, playerTwoStyle]}>
        Player 2: {playerTwoType === PlayerType.Human ? 'You' : 'Computer'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  player1: {
    fontFamily: KALAM_REGULAR,
    fontSize: 14,
    color: PLAYER_1_COLOR,
  },
  player2: {
    fontFamily: KALAM_REGULAR,
    fontSize: 14,
    color: PLAYER_2_COLOR,
  },
});

export default PlayerInfo;
