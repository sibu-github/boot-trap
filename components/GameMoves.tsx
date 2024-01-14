import React from 'react';
import {GameMovesProps} from '../definitions';
import {StyleSheet, Text, View} from 'react-native';
import {useTextColor} from '../hooks';
import {
  COLOR_GREY,
  KALAM_BOLD,
  PLAYER_1_COLOR,
  PLAYER_2_COLOR,
  translateBoardMove,
} from '../utils';
import {BoardMove} from '../lib';
import DotView from './DotView';

function getAllMoves(player1Moves: BoardMove[], player2Moves: BoardMove[]) {
  const allMoves: {move: BoardMove; color: string}[] = [];
  let i = 0;
  while (i < player1Moves.length) {
    {
      const {boardIndex, x, y} = player1Moves[i];
      allMoves.push({move: {boardIndex, x, y}, color: PLAYER_1_COLOR});
    }
    if (i < player2Moves.length) {
      const {boardIndex, x, y} = player2Moves[i];
      allMoves.push({move: {boardIndex, x, y}, color: PLAYER_2_COLOR});
    }
    i++;
  }
  return allMoves;
}

function GameMoves(props: GameMovesProps) {
  const textColor = useTextColor(props.flipTextColor);
  const containerStyle = {
    width: props.smallBoard ? 45 : 100,
  };
  const blankViewStyle = {
    width: containerStyle.width,
    height: props.smallBoard ? 17 : 40,
    borderBottomLeftRadius: props.smallBoard ? 5 : 10,
    borderBottomRightRadius: props.smallBoard ? 5 : 10,
  };
  const headerStyle = {
    fontSize: props.smallBoard ? 10 : 24,
  };
  const movesTxtStyle = {
    fontSize: props.smallBoard ? 8 : 16,
  };
  const playerColorBox = {
    width: props.smallBoard ? 8 : 15,
    height: props.smallBoard ? 8 : 15,
    borderWidth: 1,
    borderColor: COLOR_GREY,
  };

  const playerTxtStyle = {
    fontFamily: KALAM_BOLD,
    fontSize: props.smallBoard ? 8 : 16,
    color: textColor,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.movesHeader, headerStyle, {color: textColor}]}>
        Moves
      </Text>
      <View style={[styles.blankView, blankViewStyle]} />
      <View style={styles.playerWrapper}>
        <Text style={playerTxtStyle}>Player 1</Text>
        <View style={[playerColorBox, {backgroundColor: PLAYER_1_COLOR}]} />
      </View>
      <View style={styles.playerWrapper}>
        <Text style={playerTxtStyle}>Player 2</Text>
        <View style={[playerColorBox, {backgroundColor: PLAYER_2_COLOR}]} />
      </View>
      {getAllMoves(props.player1Moves, props.player2Moves).map((item, idx) => (
        <View key={idx} style={styles.movesTxtWrapper}>
          <DotView backgroundColor={item.color} />
          <Text style={[styles.movesTxt, movesTxtStyle, {color: item.color}]}>
            {translateBoardMove(item.move)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLOR_GREY,
    alignItems: 'center',
    position: 'relative',
  },
  movesHeader: {
    fontFamily: KALAM_BOLD,
  },
  blankView: {
    borderWidth: 1,
    borderColor: COLOR_GREY,

    position: 'absolute',
    top: -1,
    left: -1,
  },
  movesTxtWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  movesTxt: {
    fontFamily: KALAM_BOLD,
    paddingLeft: 10,
  },
  playerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 5,
  },
});

export default GameMoves;
