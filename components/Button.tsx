import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {COLOR_BLACK, COLOR_YELLOW, KALAM_REGULAR} from '../utils';
import {playClickOneSound} from '../utils/sound';
import {useSoundMode} from '../hooks';

type ButtonProps = {
  text: React.ReactNode;
  onClick: () => void;
  style?: {[k: string]: any};
  textStyle?: {[k: string]: any};
};

function Button(props: ButtonProps) {
  const soundMode = useSoundMode();

  const onPress = () => {
    if (soundMode) {
      playClickOneSound();
    }
    props.onClick();
  };

  return (
    <Pressable style={[styles.btn, props.style]} onPress={onPress}>
      <Text style={[styles.btnTxt, props.textStyle]}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    minWidth: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_YELLOW,
    padding: 10,
  },
  btnTxt: {
    color: COLOR_BLACK,
    fontFamily: KALAM_REGULAR,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Button;
