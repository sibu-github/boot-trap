import React from 'react';
import {ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import {useBackgroundColor, useTextColor} from '../hooks';
import {useAppDispatch, useAppSelector} from '../redux/useTypeSelectorHook';
import {
  COLOR_GREY,
  COLOR_YELLOW,
  KALAM_BOLD,
  KALAM_LIGHT,
  KALAM_REGULAR,
} from '../utils';
import {OnOffMode} from '../definitions';
import {
  updateDarkMode,
  updateShowBoardValue,
  updateShowSuggestedMove,
  updateSoundMode,
} from '../redux/settings';
import {version as appVersion} from '../package.json';

function Settings() {
  const backgroundColor = useBackgroundColor();
  const textColor = useTextColor();
  const {darkMode, soundMode, showSuggestedMove, showBoardValue} =
    useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();
  const toggleDarkMode = () => {
    dispatch(
      updateDarkMode(darkMode === OnOffMode.On ? OnOffMode.Off : OnOffMode.On),
    );
  };
  const toggleSoundMode = () => {
    dispatch(
      updateSoundMode(
        soundMode === OnOffMode.On ? OnOffMode.Off : OnOffMode.On,
      ),
    );
  };

  const toggleShowSuggestedMove = () => {
    dispatch(
      updateShowSuggestedMove(
        showSuggestedMove === OnOffMode.On ? OnOffMode.Off : OnOffMode.On,
      ),
    );
  };

  const toggleShowBoardValue = () => {
    dispatch(
      updateShowBoardValue(
        showBoardValue === OnOffMode.On ? OnOffMode.Off : OnOffMode.On,
      ),
    );
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.labelWrapper}>
          <Text style={[styles.labelTxt, {color: textColor}]}>Dark Mode</Text>
          <Switch
            value={darkMode === OnOffMode.On}
            style={styles.switch}
            thumbColor={darkMode === OnOffMode.On ? COLOR_YELLOW : COLOR_GREY}
            trackColor={{false: COLOR_GREY, true: COLOR_YELLOW}}
            onValueChange={toggleDarkMode}
          />
        </View>
        <View style={styles.labelWrapper}>
          <Text style={[styles.labelTxt, {color: textColor}]}>Sound</Text>
          <Switch
            value={soundMode === OnOffMode.On}
            style={styles.switch}
            thumbColor={soundMode === OnOffMode.On ? COLOR_YELLOW : COLOR_GREY}
            trackColor={{false: COLOR_GREY, true: COLOR_YELLOW}}
            onValueChange={toggleSoundMode}
          />
        </View>
        <View style={styles.labelWrapper}>
          <Text style={[styles.labelTxt, {color: textColor}]}>
            Suggested Move
          </Text>
          <Switch
            value={showSuggestedMove === OnOffMode.On}
            style={styles.switch}
            thumbColor={
              showSuggestedMove === OnOffMode.On ? COLOR_YELLOW : COLOR_GREY
            }
            trackColor={{false: COLOR_GREY, true: COLOR_YELLOW}}
            onValueChange={toggleShowSuggestedMove}
          />
        </View>
        <View style={styles.labelWrapper}>
          <Text style={[styles.labelTxt, {color: textColor}]}>Board Value</Text>
          <Switch
            value={showBoardValue === OnOffMode.On}
            style={styles.switch}
            thumbColor={
              showBoardValue === OnOffMode.On ? COLOR_YELLOW : COLOR_GREY
            }
            trackColor={{false: COLOR_GREY, true: COLOR_YELLOW}}
            onValueChange={toggleShowBoardValue}
          />
        </View>

        <Text style={[styles.q1, {color: textColor}]}>
          What is Suggested Move?
        </Text>
        <Text style={[styles.para1, {color: textColor}]}>
          The computer aims to identify the optimal move based on the current
          state of the board. The recommended move may not necessarily be a
          winning position (P-position) move.
        </Text>
        <Text style={[styles.q2, {color: textColor}]}>
          How is score calculated?
        </Text>
        <Text style={[styles.para1, {color: textColor}]}>
          The score is the total count of P-position moves you've made in the
          game. For additional information on P-position, please refer to the
          links provided in the "References" section.
        </Text>
        <Text style={[styles.q2, {color: textColor}]}>
          What is Board Value?
        </Text>
        <Text style={[styles.para1, {color: textColor}]}>
          Each board is assigned a value using the symbols 1, a, b, c, d. For
          example, a board with only one "X" at the center is assigned the value
          "c²." For a comprehensive list of board values for different
          positions, please refer to the links in the "References." The total
          board value is simply the multiplication of each board value. A
          winning position (P-position) occurs when the total board value is
          within the set
        </Text>
        <Text style={[styles.para1, {color: textColor}]}>
          P = [a, b², bc, c²].
        </Text>
        <Text style={[styles.para1, {color: textColor}]}>
          Following transformations can be applied on total board value.
        </Text>
        <Text style={[styles.para1, {color: textColor}]}>a² = 1</Text>
        <Text style={[styles.para1, {color: textColor}]}>b³ = b</Text>
        <Text style={[styles.para1, {color: textColor}]}>b²c = c</Text>
        <Text style={[styles.para1, {color: textColor}]}>c³ = ac²</Text>
        <Text style={[styles.para1, {color: textColor}]}>b²d = d</Text>
        <Text style={[styles.para1, {color: textColor}]}>cd = ad</Text>
        <Text style={[styles.para1, {color: textColor}]}>d² = c</Text>
        <Text style={[styles.para1, {color: textColor}]}>cd = ad</Text>
        <Text style={[styles.para1, {color: textColor}]}>d² = c</Text>
        <View style={styles.versionWrapper}>
          <Text style={[styles.versionTxt, {color: textColor}]}>
            Version {appVersion}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  labelWrapper: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  labelTxt: {
    fontFamily: KALAM_REGULAR,
    fontSize: 24,
    width: 180,
  },
  switch: {},
  versionWrapper: {
    marginTop: 'auto',
    padding: 10,
  },
  versionTxt: {
    fontFamily: KALAM_REGULAR,
    fontSize: 16,
    alignSelf: 'center',
  },
  q1: {
    fontFamily: KALAM_BOLD,
    fontSize: 20,
    marginTop: 40,
  },
  para1: {
    fontFamily: KALAM_LIGHT,
    fontSize: 14,
  },
  q2: {
    fontFamily: KALAM_BOLD,
    fontSize: 20,
  },
});

export default Settings;
