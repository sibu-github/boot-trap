import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  COLOR_BLACK,
  KALAM_BOLD,
  KALAM_LIGHT,
  RULES_LIST,
  navigateTo,
} from '../utils';
import Button from './Button';
import {useBackgroundColor, useTextColor} from '../hooks';
import ExampleBoard from './ExampleBoard';
import DotView from './DotView';

function Rules() {
  const txtColor = useTextColor();
  const backgroundColor = useBackgroundColor();

  const onLetsGo = () => navigateTo('Game');

  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor}]}>
      <Text
        style={[styles.rulesHeader, {color: txtColor, borderColor: txtColor}]}>
        Rules
      </Text>
      <ExampleBoard />
      <RulesList />
      <Button text="Let's Go" onClick={onLetsGo} />
    </ScrollView>
  );
}

function RulesList() {
  const textColor = useTextColor();
  return (
    <View style={styles.rulesContaier}>
      {RULES_LIST.map((rule, idx) => (
        <View key={idx} style={styles.rulesLine}>
          <Text style={[styles.rulesTxt, {color: textColor}]}>
            <DotView backgroundColor={textColor} /> {rule}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  rulesHeader: {
    fontFamily: KALAM_BOLD,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 5,
  },

  deadBoardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  deadBoardTxt: {
    color: COLOR_BLACK,
    fontFamily: KALAM_LIGHT,
    fontSize: 16,
    marginLeft: 10,
  },
  board3Wrapper: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  borad3Example: {
    width: '50%',
    alignItems: 'center',
  },
  board3ExmTxt: {
    color: COLOR_BLACK,
    fontFamily: KALAM_LIGHT,
    fontSize: 14,
    width: '80%',
    textAlign: 'center',
  },
  rulesContaier: {
    paddingVertical: 10,
  },
  rulesLine: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  rulesTxt: {
    fontFamily: KALAM_LIGHT,
    fontSize: 14,
  },
});

export default Rules;
