import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KALAM_LIGHT} from '../utils';
import {useSoundMode, useTextColor} from '../hooks';
import {useAppDispatch, useAppSelector} from '../redux/useTypeSelectorHook';
import {playClickOneSound} from '../utils/sound';
import GameMoves from './GameMoves';
import BoardView from './BoardView';
import PlayerInfo from './PlayerInfo';
import {Board, BoardMove, isUserMove, makeMove} from '../lib';
import {computerMoveThunk, newGame, updateMove} from '../redux/gameState';
import GameWinner from './GameWinner';

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
  } = useAppSelector(state => state.gameState);
  const dispatch = useAppDispatch();

  const startNewGame = () => {
    dispatch(newGame());
  };

  useEffect(() => {
    if (!isReady || winner) {
      return;
    }
    if (!isUserMove(currentPlayer, playerOneType, playerTwoType)) {
      dispatch(computerMoveThunk());
    }
  }, [currentPlayer, dispatch, isReady, playerOneType, playerTwoType, winner]);

  useEffect(() => {
    startNewGame();
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
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.avoidTxt, {color: textColor}]}>
        Avoid making 3"X" in a line
      </Text>
      <PlayerInfo currentPlayer={currentPlayer} />
      <View style={styles.innerContainer}>
        <GameMoves player1Moves={player1Moves} player2Moves={player2Moves} />
        <View style={styles.boardContainer}>
          {boardItems.map((items, idx) => (
            <BoardView
              key={idx}
              boardIndex={idx}
              board={new Board(items)}
              player1Moves={player1Moves}
              player2Moves={player2Moves}
              lastMove={lastMove}
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
