import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Board from '../lib/board';
import {BoardMove, DeadBoardLineType} from '../lib';
import {
  COLOR_MAROON,
  COLOR_OVERLAY,
  KALAM_BOLD,
  PLAYER_1_COLOR,
  PLAYER_2_COLOR,
} from '../utils';
import {useTextColor} from '../hooks';

type BoardViewProps = {
  board: Board;
  boardIndex: number;
  player1Moves: BoardMove[];
  player2Moves: BoardMove[];
  lastMove: BoardMove | undefined;
  onPress: (move: BoardMove) => void;
};

const borderStyle = (x: number, y: number) => {
  if ((y === 0 || y === 1) && (x === 0 || x === 1)) {
    return {borderBottomWidth: 2, borderRightWidth: 2};
  }
  if ((y === 0 || y === 1) && x === 2) {
    return {borderBottomWidth: 2};
  }
  if (y === 2 && (x === 0 || x === 1)) {
    return {borderRightWidth: 2};
  }
};

const deadBoardMarkerLineStyle = (
  lineType: DeadBoardLineType | undefined,
): StyleProp<ViewStyle> => {
  const line: StyleProp<ViewStyle> = {
    backgroundColor: COLOR_MAROON,
    position: 'absolute',
  };
  const horizontalLine: StyleProp<ViewStyle> = {
    ...line,
    height: 5,
    width: 150,
    left: 20,
  };
  const verticalLine: StyleProp<ViewStyle> = {
    ...line,
    height: 150,
    width: 5,
    top: 20,
  };

  console.log('lineType is', lineType);

  if (lineType === DeadBoardLineType.HorizontalOne) {
    return {...horizontalLine, bottom: 170};
  }
  if (lineType === DeadBoardLineType.HorizontalTwo) {
    return {...horizontalLine, bottom: 110};
  }
  if (lineType === DeadBoardLineType.HorizontalThree) {
    return {...horizontalLine, bottom: 50};
  }
  if (lineType === DeadBoardLineType.VerticalOne) {
    return {...verticalLine, left: 35};
  }
  if (lineType === DeadBoardLineType.VerticalTwo) {
    return {...verticalLine, left: 95};
  }
  if (lineType === DeadBoardLineType.VerticalThree) {
    return {...verticalLine, left: 155};
  }
  if (lineType === DeadBoardLineType.DiagonalOne) {
    return {
      width: 240,
      borderTopColor: COLOR_MAROON,
      borderTopWidth: 5,
      transform: [{rotate: '45deg'}],
      transformOrigin: 'top left',
      position: 'absolute',
      top: 10,
      left: 10,
    };
  }
  if (lineType === DeadBoardLineType.DiagonalTwo) {
    return {
      width: 240,
      borderTopColor: COLOR_MAROON,
      borderTopWidth: 5,
      transform: [{rotate: '-45deg'}],
      transformOrigin: 'top right',
      position: 'absolute',
      top: 10,
      right: 10,
    };
  }
};

const ROW_MARKERS = ['A', 'B', 'C'];
const COL_MARKERS = ['1', '2', '3'];

function BoardView(props: BoardViewProps) {
  const textColor = useTextColor();
  const containerStyle = {};
  const cellStyle = {
    borderColor: textColor,
  };
  const cellTxtStyle = (x: number, y: number) => {
    const color = props.player1Moves?.some(
      m => m.boardIndex === props.boardIndex && m.x === x && m.y === y,
    )
      ? PLAYER_1_COLOR
      : props.player2Moves?.some(
          m => m.boardIndex === props.boardIndex && m.x === x && m.y === y,
        )
      ? PLAYER_2_COLOR
      : textColor;
    return {color};
  };

  const onPress = (x: number, y: number) => {
    if (props.board.items[y][x] === '') {
      props.onPress({boardIndex: props.boardIndex, x, y});
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {props.board.items.map((row, y) => (
        <View key={y} style={styles.boardRow}>
          <Text style={[styles.rowMarkerTxt, {color: textColor}]}>
            {ROW_MARKERS[y]}
          </Text>
          {row.map((cell, x) => (
            <Pressable
              key={x}
              style={[styles.cell, cellStyle, borderStyle(x, y)]}
              onPress={() => onPress(x, y)}>
              <Text style={[styles.cellTxt, cellTxtStyle(x, y)]}>{cell}</Text>
            </Pressable>
          ))}
        </View>
      ))}
      <View style={styles.boardRow}>
        {COL_MARKERS.map(m => (
          <Text key={m} style={[styles.colMarkerTxt, {color: textColor}]}>
            {m}
          </Text>
        ))}
      </View>
      {props.board?.isDead() && <View style={styles.deadBoard} />}
      {props.board?.isDead() && (
        <View
          style={deadBoardMarkerLineStyle(props.board?.getDeadBoardLineType())}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 190,
    position: 'relative',
  },
  boardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellTxt: {
    fontSize: 30,
    fontFamily: KALAM_BOLD,
  },
  rowMarkerTxt: {
    fontFamily: KALAM_BOLD,
    fontSize: 11,
  },
  colMarkerTxt: {
    fontFamily: KALAM_BOLD,
    fontSize: 10,
    width: 60,
    textAlign: 'center',
  },
  deadBoard: {
    backgroundColor: COLOR_OVERLAY,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default BoardView;
