import React from 'react';
import {Text, View} from 'react-native';
import BoardView from './BoardView';
import {useBackgroundColor} from '../hooks';
import Board from '../lib/board';

function GameView() {
  const backgroundColor = useBackgroundColor();

  const board = new Board();
  board.markAtPos(0, 0);
  board.markAtPos(1, 1);
  board.markAtPos(2, 2);

  return (
    <View style={{backgroundColor, padding: 50}}>
      <Text> Game Page</Text>
      <BoardView
        boardIndex={0}
        board={board}
        player1Moves={[]}
        player2Moves={[]}
        lastMove={undefined}
        onPress={() => {}}
      />
    </View>
  );
}

export default GameView;
