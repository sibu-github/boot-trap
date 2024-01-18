import React, {useEffect} from 'react';
import {BackHandler, StyleSheet, Text, View} from 'react-native';
import {KALAM_LIGHT} from '../utils';
import {useSoundMode, useTextColor} from '../hooks';
import {useAppDispatch, useAppSelector} from '../redux/useTypeSelectorHook';
import {playClickOneSound} from '../utils/sound';
import GameMoves from './GameMoves';
import BoardView from './BoardView';
import PlayerInfo from './PlayerInfo';
import GameWinner from './GameWinner';
import {
  Board,
  BoardMove,
  isComputerMove,
  isPPositionMove,
  isUserMove,
  makeMove,
} from '../lib';
import {
  computerMoveThunk,
  newGame,
  resetGame,
  updateMove,
  updateScoringMove,
} from '../redux/gameState';

function GameBoardView() {
  const textColor = useTextColor();
  const soundMode = useSoundMode();
  const {
    isReady,
    playerOneType,
    playerTwoType,
    currentPlayer,
    player1Moves,
    player2Moves,
    lastMove,
    winner,
    boardItems,
    suggestedMove,
    scoringMoves,
  } = useAppSelector(state => state.gameState);
  const dispatch = useAppDispatch();

  if (!currentPlayer || !playerOneType || !playerTwoType) {
    console.log({currentPlayer, playerOneType, playerTwoType});
    throw new Error('Incorrect game initialization');
  }

  useEffect(() => {
    const backAction = () => {
      dispatch(resetGame());
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isReady || winner) {
      return;
    }
    if (isComputerMove(currentPlayer, playerOneType, playerTwoType)) {
      dispatch(computerMoveThunk());
    }
  }, [currentPlayer, dispatch, isReady, playerOneType, playerTwoType, winner]);

  useEffect(() => {
    dispatch(newGame());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (isPPositionMove(newBoards)) {
      dispatch(updateScoringMove(move));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.avoidTxt, {color: textColor}]}>
        Avoid making 3"X" in a line
      </Text>
      <PlayerInfo />
      <View style={styles.innerContainer}>
        <GameMoves
          player1Moves={player1Moves}
          player2Moves={player2Moves}
          scoringMoves={scoringMoves}
          winner={winner}
        />
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
      </View>
      <GameWinner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  avoidTxt: {
    fontFamily: KALAM_LIGHT,
    fontSize: 12,
    alignSelf: 'center',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  boardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default GameBoardView;
