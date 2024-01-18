import React from 'react';
import {StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR_BLACK} from '../../utils';

function BackIcon() {
  const onBack = () => {};

  return (
    <Ionicons
      name="arrow-back-circle-outline"
      size={40}
      color={COLOR_BLACK}
      style={styles.backIcon}
      onPress={onBack}
    />
  );
}

const styles = StyleSheet.create({
  backIcon: {
    alignSelf: 'center',
  },
});

export default BackIcon;
