import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {useBackgroundColor, useTextColor} from '../hooks';
import {useAppDispatch, useAppSelector} from '../redux/useTypeSelectorHook';
import {
  COLOR_DARK_GREEN,
  COLOR_GREEN,
  COLOR_MAROON,
  COLOR_RED,
  KALAM_BOLD,
  KALAM_LIGHT,
  KALAM_REGULAR,
} from '../utils';
import {OnOffMode} from '../definitions';
import {
  updateDarkMode,
  updateShowSuggestedMove,
  updateSoundMode,
} from '../redux/settings';
import {version as appVersion} from '../package.json';

function Settings() {
  const backgroundColor = useBackgroundColor();
  const textColor = useTextColor();
  const {darkMode, soundMode, showSuggestedMove} = useAppSelector(
    state => state.settings,
  );
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

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.labelWrapper}>
        <Text style={[styles.labelTxt, {color: textColor}]}>Dark Mode</Text>
        <Switch
          value={darkMode === OnOffMode.On}
          style={styles.switch}
          thumbColor={darkMode === OnOffMode.On ? COLOR_GREEN : COLOR_RED}
          trackColor={{false: COLOR_MAROON, true: COLOR_DARK_GREEN}}
          onValueChange={toggleDarkMode}
        />
      </View>
      <View style={styles.labelWrapper}>
        <Text style={[styles.labelTxt, {color: textColor}]}>Sound</Text>
        <Switch
          value={soundMode === OnOffMode.On}
          style={styles.switch}
          thumbColor={soundMode === OnOffMode.On ? COLOR_GREEN : COLOR_RED}
          trackColor={{false: COLOR_MAROON, true: COLOR_DARK_GREEN}}
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
            showSuggestedMove === OnOffMode.On ? COLOR_GREEN : COLOR_RED
          }
          trackColor={{false: COLOR_MAROON, true: COLOR_DARK_GREEN}}
          onValueChange={toggleShowSuggestedMove}
        />
      </View>

      <Text style={[styles.q1, {color: textColor}]}>
        What is Suggested Move?
      </Text>
      <Text style={[styles.para1, {color: textColor}]}>
        Computer tries to find out the best possible move depending on the board
        situation. Suggested Move is always shown in "Practice" mode. In
        "Challenge" mode, it can be toggled on or off.
      </Text>
      <Text style={[styles.q2, {color: textColor}]}>
        How is score calculated?
      </Text>
      <Text style={[styles.para1, {color: textColor}]}>
        Score is the total number of P-position moves you have played. To know
        more about P-position move, please go through the links given in
        "References".
      </Text>
      <View style={styles.versionWrapper}>
        <Text style={[styles.versionTxt, {color: textColor}]}>
          Version {appVersion}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
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
