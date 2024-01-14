import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useBackgroundColor} from '../hooks';
import GameLanding from './GameLanding';
import {useAppSelector} from '../redux/useTypeSelectorHook';
import GameBoardView from './GameBoardView';

function GameView() {
  const backgroundColor = useBackgroundColor();
  const {gamePage} = useAppSelector(state => state.gameState);

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
