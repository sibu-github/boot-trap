import React from 'react';
import {StyleSheet, View} from 'react-native';

function DotView({backgroundColor}: {backgroundColor: string}) {
  return <View style={[styles.dot, {backgroundColor}]} />;
}

const styles = StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

export default DotView;
