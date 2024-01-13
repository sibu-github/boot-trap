import React from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {useBackgroundColor, useTextColor} from '../hooks';
import {useAppDispatch, useAppSelector} from '../redux/useTypeSelectorHook';
import {
  COLOR_DARK_GREEN,
  COLOR_GREEN,
  COLOR_MAROON,
  COLOR_RED,
  KALAM_REGULAR,
} from '../utils';
import {OnOffMode} from '../definitions';
import {updateDarkMode, updateSoundMode} from '../redux/settings';
import {version as appVersion} from '../package.json';

function Settings() {
  const backgroundColor = useBackgroundColor();
  const textColor = useTextColor();
  const {darkMode, soundMode} = useAppSelector(state => state.settings);
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
    width: 160,
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
});

export default Settings;
