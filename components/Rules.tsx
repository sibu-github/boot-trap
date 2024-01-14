import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  COLOR_BLACK,
  COLOR_GREEN,
  COLOR_GREY,
  COLOR_RED,
  COLOR_WHITE,
  KALAM_BOLD,
  KALAM_LIGHT,
  RULES_LIST,
  navigateTo,
} from '../utils';
import Button from './Button';
import {useBackgroundColor, useTextColor} from '../hooks';

const RULES_BOARD_1 = '../images/rules_board_1.png';
const RULES_BOARD_2 = '../images/rules_board_1.png';
const RULES_BOARD_3_1 = '../images/rules_board_3_1.png';
const RULES_BOARD_3_2 = '../images/rules_board_3_2.png';

function Rules() {
  const txtColor = useTextColor();
  const containerBgColor = useBackgroundColor();

  const onLetsGo = () => navigateTo('Game');

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: containerBgColor},
      ]}>
      <Text
        style={[styles.rulesHeader, {color: txtColor, borderColor: txtColor}]}>
        Rules
      </Text>
      <ExampleBoard />
      <RulesList textColor={txtColor} />
      <Button text="Let's Go" onClick={onLetsGo} />
    </ScrollView>
  );
}

function ExampleBoard() {
  return (
    <View style={styles.exampleContainer}>
      <View style={styles.deadBoardWrapper}>
        <Image source={require(RULES_BOARD_1)} />
        <Text style={styles.deadBoardTxt}>Board 1: Dead</Text>
      </View>
      <View style={styles.deadBoardWrapper}>
        <Image source={require(RULES_BOARD_2)} />
        <Text style={styles.deadBoardTxt}>Board 2: Dead</Text>
      </View>
      <View style={styles.board3Wrapper}>
        <View style={styles.borad3Example}>
          <Entypo name="circle-with-cross" size={30} color={COLOR_RED} />
          <Image source={require(RULES_BOARD_3_1)} />
          <Text style={styles.board3ExmTxt}>In the next move Red looses</Text>
        </View>
        <View style={[styles.borad3Example]}>
          <AntDesign name="checkcircle" size={27} color={COLOR_GREEN} />
          <Image source={require(RULES_BOARD_3_2)} />
          <Text style={styles.board3ExmTxt}>In the next move Blue looses</Text>
        </View>
      </View>
    </View>
  );
}

type RulesListProps = {
  textColor: string;
};
function RulesList(props: RulesListProps) {
  return (
    <View style={styles.rulesContaier}>
      {RULES_LIST.map((rule, idx) => (
        <View key={idx} style={styles.rulesLine}>
          <Text style={[styles.rulesTxt, {color: props.textColor}]}>
            <View style={[styles.dot, {backgroundColor: props.textColor}]} />{' '}
            {rule}
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
  exampleContainer: {
    backgroundColor: COLOR_WHITE,
    marginTop: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: COLOR_GREY,
    alignItems: 'center',
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
    fontSize: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

export default Rules;
