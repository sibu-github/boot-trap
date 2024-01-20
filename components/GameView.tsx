import React, {useCallback} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useBackgroundColor} from '../hooks';
import GameLanding from './gameLanding/GameLanding';
import {useAppDispatch, useAppSelector} from '../redux/useTypeSelectorHook';
import GameBoardView from './gameBoard/GameBoardView';
import {useFocusEffect} from '@react-navigation/native';
import {resetGame} from '../redux/gameState';

function GameView() {
  const backgroundColor = useBackgroundColor();
  const {gamePage} = useAppSelector(state => state.gameState);
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(resetGame());
    }, [dispatch]),
  );

  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor}]}>
      {gamePage === 'Landing' && <GameLanding />}
      {gamePage === 'GameBoard' && <GameBoardView />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GameView;
