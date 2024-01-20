import React from 'react';
import {GameMovesProps} from '../../definitions';
import {StyleSheet, Text, View} from 'react-native';
import {useTextColor} from '../../hooks';
import {
  COLOR_GREY,
  COLOR_YELLOW,
  KALAM_BOLD,
  PLAYER_1_COLOR,
  PLAYER_2_COLOR,
  translateBoardMove,
} from '../../utils';
import {BoardMove} from '../../lib';
import DotView from '../DotView';

function isScoringMove(move: BoardMove, props: GameMovesProps) {
  const {scoringMoves, winner} = props;
  if (!winner) {
    return false;
  }
  return (
    !!scoringMoves &&
    scoringMoves.some(
      m => m.boardIndex === move.boardIndex && m.x === move.x && m.y === move.y,
    )
  );
}

function getAllMoves(props: GameMovesProps) {
  const {player1Moves, player2Moves} = props;
  const allMoves: {move: BoardMove; color: string}[] = [];
  let i = 0;
  while (i < player1Moves.length) {
    {
      const {boardIndex, x, y} = player1Moves[i];
      const color = PLAYER_1_COLOR;
      allMoves.push({move: {boardIndex, x, y}, color});
    }
    if (i < player2Moves.length) {
      const {boardIndex, x, y} = player2Moves[i];
      const color = PLAYER_2_COLOR;
      allMoves.push({move: {boardIndex, x, y}, color});
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
    fontSize: props.smallBoard ? 6 : 12,
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

  const scoringMoveStyle = (move: BoardMove) => {
    return isScoringMove(move, props)
      ? {
          borderWidth: 1,
          borderColor: COLOR_YELLOW,
        }
      : {};
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
      <View style={styles.blankLine} />
      {getAllMoves(props).map((item, idx) => (
        <View
          key={idx}
          style={[styles.movesTxtWrapper, scoringMoveStyle(item.move)]}>
          <DotView backgroundColor={item.color} />
          <Text style={[styles.movesTxt, movesTxtStyle, {color: item.color}]}>
            {translateBoardMove(item.move)}
          </Text>
        </View>
      ))}
      {!props.smallBoard && props.onUndo && (
        <Text
          style={[{color: textColor}, styles.undoLink]}
          onPress={props.onUndo}>
          Undo
        </Text>
      )}
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
  blankLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLOR_GREY,
  },
  movesTxtWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
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
    paddingTop: 3,
  },
  undoLink: {
    fontFamily: KALAM_BOLD,
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 'auto',
    paddingVertical: 10,
  },
});

export default GameMoves;
