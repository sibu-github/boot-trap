import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  COLOR_BLACK,
  COLOR_LIGHT_YELLOW,
  KALAM_BOLD,
  KALAM_REGULAR,
} from '../../utils';
import PlayerButtons from './PlayerButtons';
import RulesButtons from './RulesButtons';
import GameTypeButtons from './GameTypeButtons';
import GameModeButtons from './GameModeButtons';
import BackIcon from './BackIcon';
import PlayerNames from './PlayerNames';

const GAME_LANDING_IMAGE = '../../images/game_landing.png';

function GameLanding() {
  return (
    <View style={styles.container}>
      <Image source={require(GAME_LANDING_IMAGE)} style={styles.img} />
      <Text style={styles.didYouUnderstand}>Did you understand the rules?</Text>
      <Text style={styles.revisitRules}>
        Please revisit Rules if you have doubt.
      </Text>
      <Text style={styles.notATicTacToe}>This is not Tic-Tac-Toe</Text>
      <View style={styles.btnWrapper}>
        <RulesButtons />
        <GameTypeButtons />
        <GameModeButtons />
        <PlayerButtons />
        <PlayerNames />
        <BackIcon />
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
  revisitRules: {
    color: COLOR_BLACK,
    fontFamily: KALAM_REGULAR,
    fontSize: 14,
    position: 'absolute',
    top: 30,
  },
  notATicTacToe: {
    color: COLOR_BLACK,
    fontFamily: KALAM_BOLD,
    fontSize: 24,
    position: 'absolute',
    top: 90,
    textDecorationLine: 'underline',
    width: 200,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  btnWrapper: {
    position: 'absolute',
    bottom: '15%',
  },
  backIcon: {
    alignSelf: 'center',
  },
});

export default GameLanding;
