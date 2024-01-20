import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {BOARD_COL_SIZE, BOARD_ROW_SIZE, DeadBoardLineType} from '../../lib';
import {
  BIG_BOARD_CELL_SIZE,
  BIG_BOARD_TXT_SIZE,
  COLOR_GREEN,
  COLOR_MAROON,
  COLOR_OVERLAY,
  COLOR_YELLOW,
  COL_MARKERS,
  KALAM_BOLD,
  PLAYER_1_COLOR,
  PLAYER_2_COLOR,
  ROW_MARKERS,
  SMALL_BOARD_CELL_SIZE,
  SMALL_BOARD_TXT_SIZE,
} from '../../utils';
import {useShowBoardValue, useTextColor} from '../../hooks';
import {BoardViewProps} from '../../definitions';

function borderStyle(x: number, y: number) {
  if ((y === 0 || y === 1) && (x === 0 || x === 1)) {
    return {borderBottomWidth: 2, borderRightWidth: 2};
  }
  if ((y === 0 || y === 1) && x === 2) {
    return {borderBottomWidth: 2};
  }
  if (y === 2 && (x === 0 || x === 1)) {
    return {borderRightWidth: 2};
  }
}

function deadBoardMarkerLineStyle(
  lineType: DeadBoardLineType | undefined,
  smallBoard: boolean,
): StyleProp<ViewStyle> {
  const cellSize = smallBoard ? SMALL_BOARD_CELL_SIZE : BIG_BOARD_CELL_SIZE;
  const lineWidth = smallBoard ? 2 : 5;
  const line: StyleProp<ViewStyle> = {
    backgroundColor: COLOR_MAROON,
    position: 'absolute',
  };
  const horizontalLine: StyleProp<ViewStyle> = {
    ...line,
    height: lineWidth,
    width: cellSize * 2.5,
    left: smallBoard ? 10 : 20,
  };
  const verticalLine: StyleProp<ViewStyle> = {
    ...line,
    height: cellSize * 2.5,
    width: lineWidth,
    top: smallBoard ? 10 : 20,
  };

  if (lineType === DeadBoardLineType.HorizontalOne) {
    return {...horizontalLine, bottom: smallBoard ? 63 : 170};
  }
  if (lineType === DeadBoardLineType.HorizontalTwo) {
    return {...horizontalLine, bottom: smallBoard ? 43 : 110};
  }
  if (lineType === DeadBoardLineType.HorizontalThree) {
    return {...horizontalLine, bottom: smallBoard ? 23 : 50};
  }
  if (lineType === DeadBoardLineType.VerticalOne) {
    return {...verticalLine, left: smallBoard ? 16 : 35};
  }
  if (lineType === DeadBoardLineType.VerticalTwo) {
    return {...verticalLine, left: smallBoard ? 36 : 95};
  }
  if (lineType === DeadBoardLineType.VerticalThree) {
    return {...verticalLine, left: smallBoard ? 56 : 155};
  }
  if (lineType === DeadBoardLineType.DiagonalOne) {
    return {
      width: cellSize * 4,
      borderTopColor: COLOR_MAROON,
      borderTopWidth: lineWidth,
      transform: [{rotate: '45deg'}],
      transformOrigin: 'top left',
      position: 'absolute',
      top: smallBoard ? 2 : 10,
      left: smallBoard ? 2 : 10,
    };
  }
  if (lineType === DeadBoardLineType.DiagonalTwo) {
    return {
      width: cellSize * 4,
      borderTopColor: COLOR_MAROON,
      borderTopWidth: lineWidth,
      transform: [{rotate: '-45deg'}],
      transformOrigin: 'top right',
      position: 'absolute',
      top: smallBoard ? 2 : 10,
      right: smallBoard ? 2 : 10,
    };
  }
}

function BoardView(props: BoardViewProps) {
  const textColor = useTextColor(props.flipTextColor);
  const showBoardValue = useShowBoardValue();
  const containerStyle = {width: BIG_BOARD_CELL_SIZE * BOARD_ROW_SIZE + 10};
  if (props.smallBoard) {
    containerStyle.width = SMALL_BOARD_CELL_SIZE * BOARD_ROW_SIZE + 10;
  }
  const cellStyle = {
    borderColor: textColor,
    width: BIG_BOARD_CELL_SIZE,
    height: BIG_BOARD_CELL_SIZE,
  };
  if (props.smallBoard) {
    cellStyle.height = SMALL_BOARD_CELL_SIZE;
    cellStyle.width = SMALL_BOARD_CELL_SIZE;
  }
  const cellTxtStyle = (x: number, y: number) => {
    const cellTxt = {fontSize: BIG_BOARD_TXT_SIZE, color: textColor};
    if (props.smallBoard) {
      cellTxt.fontSize = SMALL_BOARD_TXT_SIZE;
    }
    const color = props.player1Moves?.some(
      m => m.boardIndex === props.boardIndex && m.x === x && m.y === y,
    )
      ? PLAYER_1_COLOR
      : props.player2Moves?.some(
          m => m.boardIndex === props.boardIndex && m.x === x && m.y === y,
        )
      ? PLAYER_2_COLOR
      : textColor;
    cellTxt.color = color;
    return cellTxt;
  };

  const lastMoveCellStyle = (x: number, y: number) => {
    if (!props.lastMove) {
      return {};
    }
    if (
      props.lastMove.boardIndex === props.boardIndex &&
      props.lastMove.x === x &&
      props.lastMove.y === y
    ) {
      return {backgroundColor: COLOR_YELLOW};
    }
    return {};
  };

  const suggestedMoveCellStyle = (x: number, y: number) => {
    if (!props.suggestedMove) {
      return {};
    }
    if (
      props.suggestedMove.boardIndex === props.boardIndex &&
      props.suggestedMove.x === x &&
      props.suggestedMove.y === y
    ) {
      return {backgroundColor: COLOR_GREEN};
    }
    return {};
  };

  const onPress = (x: number, y: number) => {
    if (props.board.items[y][x] === '') {
      props.onPress({boardIndex: props.boardIndex, x, y});
    }
  };

  const rowMarkerTxtSize = props.smallBoard ? 8 : 11;
  const cellMarkerTxtSize = props.smallBoard ? 8 : 10;

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.container, containerStyle]}>
        {props.board.items.map((row, y) => (
          <View key={y} style={styles.boardRow}>
            <Text
              style={[
                styles.rowMarkerTxt,
                {color: textColor, fontSize: rowMarkerTxtSize},
              ]}>
              {ROW_MARKERS[props.boardIndex * BOARD_COL_SIZE + y]}
            </Text>
            {row.map((cell, x) => (
              <Pressable
                key={x}
                style={[styles.cell, cellStyle, borderStyle(x, y)]}
                onPress={() => onPress(x, y)}>
                <View
                  style={[
                    styles.cellTxtWrapper,
                    lastMoveCellStyle(x, y),
                    suggestedMoveCellStyle(x, y),
                  ]}>
                  <Text style={[styles.cellTxt, cellTxtStyle(x, y)]}>
                    {cell}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        ))}
        <View style={styles.boardRow}>
          {COL_MARKERS.map(m => (
            <Text
              key={m}
              style={[
                styles.colMarkerTxt,
                {color: textColor, fontSize: cellMarkerTxtSize},
              ]}>
              {m}
            </Text>
          ))}
        </View>
        {props.board?.isDead() && <View style={styles.deadBoard} />}
        {props.board?.isDead() && (
          <View
            style={deadBoardMarkerLineStyle(
              props.board?.getDeadBoardLineType(),
              !!props.smallBoard,
            )}
          />
        )}
      </View>
      {!props.smallBoard && showBoardValue && (
        <Text style={styles.boardValueTxt}>
          {props.board.boardValue().symbol}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
  },
  boardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellTxt: {
    fontFamily: KALAM_BOLD,
  },
  cellTxtWrapper: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowMarkerTxt: {
    fontFamily: KALAM_BOLD,
    width: 10,
  },
  colMarkerTxt: {
    flex: 1,
    fontFamily: KALAM_BOLD,
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
  boardValueTxt: {
    color: COLOR_YELLOW,
    fontFamily: KALAM_BOLD,
    fontSize: 20,
    paddingLeft: 20,
  },
});

export default BoardView;
