import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLOR_BLACK} from '../../utils';
import Button from '../Button';
import {useAppDispatch, useAppSelector} from '../../redux/useTypeSelectorHook';
import {setGameType} from '../../redux/gameState';

function GameTypeButtons() {
  const {rulesUnderstood, gameType} = useAppSelector(state => state.gameState);
  const dispatch = useAppDispatch();
  if (!rulesUnderstood || !!gameType) {
    return false;
  }

  const onPlayerVsPlayer = () => dispatch(setGameType('VsHuman'));
  const onPlayerVsComputer = () => dispatch(setGameType('VsComputer'));

  const playerVsPlayer = (
    <>
      <FontAwesome name="user" size={30} color={COLOR_BLACK} />
      <Text>
        {'  '}Vs{'  '}
      </Text>
      <FontAwesome name="user" size={30} color={COLOR_BLACK} />
    </>
  );

  const playerVsComputer = (
    <>
      <FontAwesome name="user" size={30} color={COLOR_BLACK} />{' '}
      <Text>
        {'  '}Vs{'  '}
      </Text>
      <Entypo name="classic-computer" size={30} color={COLOR_BLACK} />
    </>
  );

  return (
    <>
      <Button
        text={playerVsPlayer}
        onClick={onPlayerVsPlayer}
        style={styles.gameTypeBtn}
      />
      <View style={styles.blank} />
      <Button
        text={playerVsComputer}
        onClick={onPlayerVsComputer}
        style={styles.gameTypeBtn}
      />
    </>
  );
}

const styles = StyleSheet.create({
  blank: {
    height: 10,
  },
  gameTypeBtn: {
    width: 150,
    alignSelf: 'center',
  },
});

export default GameTypeButtons;
