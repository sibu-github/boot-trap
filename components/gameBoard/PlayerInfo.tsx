import React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import {useAppSelector} from '../../redux/useTypeSelectorHook';
import {PlayerType} from '../../lib';
import {
  COLOR_GREEN,
  COLOR_YELLOW,
  KALAM_LIGHT,
  KALAM_REGULAR,
  PLAYER_1_COLOR,
  PLAYER_2_COLOR,
} from '../../utils';
import {StyleProp} from 'react-native';
import {useShowSuggestedMove, useTextColor} from '../../hooks';

function PlayerInfo() {
  const textColor = useTextColor();
  const suggestionMode = useShowSuggestedMove();
  const {currentPlayer, playerOneType, playerTwoType, gameType, playerNames} =
    useAppSelector(state => state.gameState);

  const underlineStyle: StyleProp<TextStyle> = {
    borderBottomWidth: 2,
    borderColor: COLOR_YELLOW,
  };
  const playerOneStyle: StyleProp<TextStyle> =
    currentPlayer === 'one' ? underlineStyle : {};
  const playerTwoStyle: StyleProp<TextStyle> =
    currentPlayer === 'two' ? underlineStyle : {};

  const player1Name = () => {
    if (gameType === 'VsComputer') {
      if (playerOneType === PlayerType.Human) {
        return 'You';
      } else {
        return 'Computer';
      }
    }

    return playerNames.length > 1 ? playerNames[0] : '';
  };

  const player2Name = () => {
    if (gameType === 'VsComputer') {
      if (playerTwoType === PlayerType.Human) {
        return 'You';
      } else {
        return 'Computer';
      }
    }

    return playerNames.length > 1 ? playerNames[1] : '';
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={[styles.player1, playerOneStyle]}>
          Player 1: {player1Name()}
        </Text>
        <Text style={[styles.player2, playerTwoStyle]}>
          Player 2: {player2Name()}
        </Text>
      </View>
      {suggestionMode && (
        <Text style={[styles.suggestedMoveTxt, {color: textColor}]}>
          Suggested moves are shown in <View style={styles.greenBox} />
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 2,
  },
  player1: {
    fontFamily: KALAM_REGULAR,
    fontSize: 16,
    color: PLAYER_1_COLOR,
  },
  player2: {
    fontFamily: KALAM_REGULAR,
    fontSize: 16,
    color: PLAYER_2_COLOR,
  },
  suggestedMoveTxt: {
    fontFamily: KALAM_LIGHT,
    fontSize: 10,
    alignSelf: 'center',
  },
  greenBox: {
    width: 8,
    height: 8,
    backgroundColor: COLOR_GREEN,
  },
});

export default PlayerInfo;
