import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useBackgroundColor, useTextColor} from '../hooks';
import {Board, BoardMove, PlayerNumber} from '../lib';
import BoardView from './BoardView';
import {COLOR_GREEN, COLOR_RED, KALAM_LIGHT} from '../utils';
import GameMoves from './GameMoves';

const allMoves: {move: BoardMove; player: PlayerNumber}[] = [
  {move: {boardIndex: 0, x: 0, y: 0}, player: 'one'},
  {move: {boardIndex: 0, x: 1, y: 1}, player: 'two'},
  {move: {boardIndex: 0, x: 2, y: 0}, player: 'one'},
  {move: {boardIndex: 1, x: 1, y: 1}, player: 'two'},
  {move: {boardIndex: 1, x: 1, y: 0}, player: 'one'},
  {move: {boardIndex: 2, x: 1, y: 1}, player: 'two'},
  {move: {boardIndex: 1, x: 2, y: 2}, player: 'one'},
  {move: {boardIndex: 2, x: 0, y: 1}, player: 'two'},
  {move: {boardIndex: 2, x: 1, y: 0}, player: 'one'},
  {move: {boardIndex: 0, x: 1, y: 0}, player: 'two'},
  {move: {boardIndex: 1, x: 2, y: 1}, player: 'one'},
  {move: {boardIndex: 1, x: 1, y: 2}, player: 'two'},
];

function playerMoves(boardIndex: number, player: PlayerNumber): BoardMove[] {
  if (boardIndex === -1) {
    return allMoves
      .filter(item => item.player === player)
      .map(m => ({boardIndex: m.move.boardIndex, x: m.move.x, y: m.move.y}));
  }
  return allMoves
    .filter(
      item => item.move.boardIndex === boardIndex && item.player === player,
    )
    .map(m => ({
      boardIndex: m.move.boardIndex,
      x: m.move.x,
      y: m.move.y,
    }));
}

function ExampleBoard() {
  const textColor = useBackgroundColor();
  const backgroundColor = useTextColor();

  const boardOne = new Board();
  const boardTwo = new Board();
  const boardThree = new Board();
  const boardFour = new Board();

  allMoves.forEach(item => {
    if (item.move.boardIndex === 0) {
      boardOne.markAtPos(item.move.x, item.move.y);
    } else if (item.move.boardIndex === 1) {
      boardTwo.markAtPos(item.move.x, item.move.y);
    } else if (item.move.boardIndex === 2) {
      boardThree.markAtPos(item.move.x, item.move.y);
      boardFour.markAtPos(item.move.x, item.move.y);
    }
  });
  const lastMoveOne: BoardMove = {boardIndex: 2, x: 2, y: 1};
  const lastMoveTwo: BoardMove = {boardIndex: 2, x: 0, y: 0};
  const board3Player1Moves = playerMoves(2, 'one');

  const board4Player1Moves = playerMoves(2, 'one');
  board4Player1Moves.push(lastMoveTwo);

  const onPress = () => {};

  return (
    <View style={[styles.exampleContainer, {backgroundColor}]}>
      <Text style={[styles.assumeTxt, {color: textColor}]}>
        Let's assume you're Player 1
      </Text>
      <GameMoves
        player1Moves={playerMoves(-1, 'one')}
        player2Moves={playerMoves(-1, 'two')}
        smallBoard={true}
        flipTextColor={true}
      />
      <View style={styles.wrapper}>
        <View style={styles.exampleBoardRow}>
          <View style={styles.boardWrapper}>
            <BoardView
              board={boardOne}
              boardIndex={0}
              flipTextColor={true}
              smallBoard={true}
              onPress={onPress}
              player1Moves={playerMoves(0, 'one')}
              player2Moves={playerMoves(0, 'two')}
              lastMove={undefined}
            />
            <Text style={[styles.descTxt, {color: textColor}]}>
              Board 1: Dead
            </Text>
          </View>
          <View style={styles.boardWrapper}>
            <BoardView
              board={boardTwo}
              boardIndex={1}
              flipTextColor={true}
              smallBoard={true}
              onPress={onPress}
              player1Moves={playerMoves(1, 'one')}
              player2Moves={playerMoves(1, 'two')}
              lastMove={undefined}
            />
            <Text style={[styles.descTxt, {color: textColor}]}>
              Board 2: Dead
            </Text>
          </View>
        </View>
        <View style={styles.exampleBoardRow}>
          <View style={styles.boardWrapper}>
            <Entypo name="circle-with-cross" size={20} color={COLOR_RED} />
            <BoardView
              board={boardThree}
              boardIndex={2}
              flipTextColor={true}
              smallBoard={true}
              onPress={onPress}
              player1Moves={board3Player1Moves}
              player2Moves={playerMoves(2, 'two')}
              lastMove={lastMoveOne}
            />
            <Text style={[styles.descTxt, {color: textColor}]}>
              Board 3: Incorrect move on H3. You would loose the game as it
              makes 3"X" in a line on last board.
            </Text>
          </View>
          <View style={styles.boardWrapper}>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color={COLOR_GREEN}
            />
            <BoardView
              board={boardFour}
              boardIndex={2}
              flipTextColor={true}
              smallBoard={true}
              onPress={onPress}
              player1Moves={board4Player1Moves}
              player2Moves={playerMoves(2, 'two')}
              lastMove={lastMoveTwo}
            />
            <Text style={[styles.descTxt, {color: textColor}]}>
              Board 3: Correct move on G1 as you force your opponent to make
              3"X" in a line.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exampleContainer: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  assumeTxt: {
    width: '100%',
    textAlign: 'center',
    fontFamily: KALAM_LIGHT,
    fontSize: 10,
  },
  wrapper: {
    flex: 1,
  },
  descTxt: {
    fontFamily: KALAM_LIGHT,
    fontSize: 10,
    width: 120,
    textAlign: 'center',
  },
  exampleBoardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  boardWrapper: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
});

export default ExampleBoard;
