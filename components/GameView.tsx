import React from 'react';
import {Text, View} from 'react-native';
import BoardView from './BoardView';
import {useBackgroundColor} from '../hooks';
import Board from '../lib/board';
import {BoardMove} from '../lib';

function GameView() {
  const backgroundColor = useBackgroundColor();

  const board = new Board();
  const player1Moves: BoardMove[] = [{boardIndex: 0, x: 0, y: 2}];
  const player2Moves: BoardMove[] = [{boardIndex: 0, x: 1, y: 1}];
  const lastMove: BoardMove = {boardIndex: 0, x: 0, y: 2};
  // board.markAtPos(2, 0);
  board.markAtPos(1, 1);
  board.markAtPos(0, 2);

  return (
    <View style={{backgroundColor, padding: 50}}>
      <Text> Game Page</Text>
      <BoardView
        boardIndex={0}
        board={board}
        player1Moves={player1Moves}
        player2Moves={player2Moves}
        lastMove={lastMove}
        onPress={() => {}}
      />
    </View>
  );
}

export default GameView;
