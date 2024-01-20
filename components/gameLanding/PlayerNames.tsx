import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  COLOR_BLACK,
  COLOR_GREY,
  COLOR_LIGHT_YELLOW,
  COLOR_OVERLAY_DARK,
  COLOR_YELLOW,
  KALAM_REGULAR,
} from '../../utils';
import Button from '../Button';
import {useSoundMode} from '../../hooks';
import {playClickOneSound} from '../../utils/sound';
import {useAppDispatch, useAppSelector} from '../../redux/useTypeSelectorHook';
import {startPlayMultiPlayer} from '../../redux/gameState';

function PlayerNames() {
  const {rulesUnderstood, gameType, playerNames} = useAppSelector(
    state => state.gameState,
  );
  const [playerOneName, setPlayerOneName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');
  const [disabled, setDisabled] = useState(true);
  const soundMode = useSoundMode();
  const dispatch = useAppDispatch();
  const rotateAnim = useRef(new Animated.Value(0));
  const spin = rotateAnim.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  useEffect(() => {
    if (playerNames && playerNames.length > 1) {
      setPlayerOneName(playerNames[0]);
      setPlayerTwoName(playerNames[1]);
    }
  }, [playerNames]);

  const rotateIcon = () => {
    rotateAnim.current.resetAnimation();
    Animated.timing(rotateAnim.current, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onChangePlayerOne = (text: string) => {
    const val = text ? text.substring(0, 10) : '';
    setPlayerOneName(val);
  };

  const onChangePlayerTwo = (text: string) => {
    const val = text ? text.substring(0, 10) : '';
    setPlayerTwoName(val);
  };

  const onSwap = () => {
    rotateIcon();
    if (soundMode) {
      playClickOneSound();
    }
    const name1 = playerOneName;
    const name2 = playerTwoName;
    setPlayerOneName(name2);
    setPlayerTwoName(name1);
  };

  const onPlay = () => {
    if (disabled) {
      return;
    }
    dispatch(startPlayMultiPlayer({playerOneName, playerTwoName}));
  };

  useEffect(() => {
    if (!!playerOneName && !!playerTwoName) {
      setDisabled(false);
    }
  }, [playerOneName, playerTwoName]);

  const btnStyle = () => {
    if (disabled) {
      return {backgroundColor: COLOR_OVERLAY_DARK};
    }
    return {};
  };

  const btnTxtStyle = () => {
    if (disabled) {
      return {color: COLOR_GREY};
    }
    return {};
  };

  if (!rulesUnderstood || gameType !== 'VsHuman') {
    return false;
  }

  return (
    <View>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="swap-vertical-circle"
          size={40}
          color={'transparent'}
        />
        <View style={styles.inputBoxWrapper}>
          <TextInput
            value={playerOneName}
            onChangeText={onChangePlayerOne}
            placeholder="Player 1 Name"
            placeholderTextColor={COLOR_YELLOW}
            style={styles.inputBox}
          />
          <TextInput
            value={playerTwoName}
            onChangeText={onChangePlayerTwo}
            placeholder="Player 2 Name"
            placeholderTextColor={COLOR_YELLOW}
            style={styles.inputBox}
          />
        </View>
        <Animated.View style={{transform: [{rotate: spin}]}}>
          <MaterialCommunityIcons
            name="swap-vertical-circle"
            size={40}
            color={COLOR_BLACK}
            onPress={onSwap}
          />
        </Animated.View>
      </View>
      <Button
        text="Play"
        onClick={onPlay}
        style={[styles.playBtn, btnStyle()]}
        textStyle={btnTxtStyle()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBoxWrapper: {},
  inputBox: {
    backgroundColor: COLOR_LIGHT_YELLOW,
    marginVertical: 5,
    width: 150,
    borderRadius: 10,
    paddingLeft: 5,
    fontFamily: KALAM_REGULAR,
    fontSize: 16,
    color: COLOR_BLACK,
    borderWidth: 1,
    borderColor: COLOR_BLACK,
  },
  playBtn: {
    width: 150,
    alignSelf: 'center',
  },
});

export default PlayerNames;
