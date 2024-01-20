import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/useTypeSelectorHook';
import {
  Board,
  BoardMove,
  isPPositionMove,
  isUserMove,
  makeMove,
} from '../../lib';
import BoardView from './BoardView';
import {playClickOneSound} from '../../utils/sound';
import {useSoundMode} from '../../hooks';
import {updateMove, updateScoringMove} from '../../redux/gameState';

function BoardContainer() {
  const {
    gameType,
    playerOneType,
    playerTwoType,
    currentPlayer,
    player1Moves,
    player2Moves,
    lastMove,
    winner,
    boardItems,
    suggestedMove,
  } = useAppSelector(state => state.gameState);
  const soundMode = useSoundMode();
  const dispatch = useAppDispatch();

  if (!currentPlayer || !playerOneType || !playerTwoType) {
    console.log({currentPlayer, playerOneType, playerTwoType});
    throw new Error('Incorrect game initialization');
  }

  const onClick = (move: BoardMove) => {
    if (!!winner || !isUserMove(currentPlayer, playerOneType, playerTwoType)) {
      return;
    }
    if (soundMode) {
      playClickOneSound();
    }
    const newBoards = makeMove(move, boardItems);
    const newBoardItems = newBoards.map(b => b.items);
    dispatch(updateMove({move, newBoardItems, player: currentPlayer}));
    if (gameType === 'VsComputer' && isPPositionMove(newBoards)) {
      dispatch(updateScoringMove(move));
    }
  };

  return (
    <View style={styles.boardContainer}>
      {boardItems.map((items, idx) => (
        <BoardView
          key={idx}
          boardIndex={idx}
          board={new Board(items)}
          player1Moves={player1Moves}
          player2Moves={player2Moves}
          lastMove={lastMove}
          suggestedMove={suggestedMove}
          onPress={onClick}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default BoardContainer;
