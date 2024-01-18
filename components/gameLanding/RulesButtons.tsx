import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../Button';
import {setRulesUnderstood} from '../../redux/gameState';
import {navigateTo} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../redux/useTypeSelectorHook';

function RulesButtons() {
  const {rulesUnderstood} = useAppSelector(state => state.gameState);
  const dispatch = useAppDispatch();

  const onShowMeRules = () => navigateTo('Rules');
  const onUnderstood = () => dispatch(setRulesUnderstood());

  if (rulesUnderstood) {
    return false;
  }

  return (
    <>
      <Button text="Show Me Rules" onClick={onShowMeRules} />
      <View style={styles.blank} />
      <Button text="Yes, I understood Rules" onClick={onUnderstood} />
    </>
  );
}

const styles = StyleSheet.create({
  blank: {
    height: 10,
  },
});

export default RulesButtons;
