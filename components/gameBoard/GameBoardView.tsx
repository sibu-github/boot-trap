import React, {useEffect} from 'react';
import {BackHandler, StyleSheet, Text, View} from 'react-native';
import {KALAM_LIGHT} from '../../utils';
import {useTextColor} from '../../hooks';
import {useAppDispatch, useAppSelector} from '../../redux/useTypeSelectorHook';
import PlayerInfo from './PlayerInfo';
import GameWinner from './GameWinner';
import {isComputerMove} from '../../lib';
import {computerMoveThunk, newGame, resetGame} from '../../redux/gameState';
import BoardContainer from './BoardContainer';
import GameMovesContainer from './GameMovesContainer';

function GameBoardView() {
  const textColor = useTextColor();
  const {isReady, playerOneType, playerTwoType, currentPlayer, winner} =
    useAppSelector(state => state.gameState);
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

  return (
    <View style={styles.container}>
      <Text style={[styles.avoidTxt, {color: textColor}]}>
        Avoid making 3"X" in a line
      </Text>
      <PlayerInfo />
      <View style={styles.innerContainer}>
        <GameMovesContainer />
        <BoardContainer />
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
});

export default GameBoardView;
