import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {COLOR_BLACK, COLOR_YELLOW, KALAM_REGULAR} from '../utils';

type ButtonProps = {
  text: string;
  onClick: () => void;
  style?: {[k: string]: any};
  textStyle?: {[k: string]: any};
};

function Button(props: ButtonProps) {
  return (
    <Pressable style={[styles.btn, props.style]} onPress={props.onClick}>
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
  },
  btnTxt: {
    color: COLOR_BLACK,
    fontFamily: KALAM_REGULAR,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Button;
