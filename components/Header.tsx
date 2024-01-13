import React from 'react';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {COLOR_BLACK, COLOR_YELLOW, KALAM_BOLD, KALAM_LIGHT} from '../utils';

const LOGO_IMAGE_PATH = '../images/logo.png';

function Header(props: DrawerHeaderProps) {
  return (
    <View style={styles.container}>
      <Image source={require(LOGO_IMAGE_PATH)} style={styles.logo} />
      <View style={styles.titleWrapper}>
        <Text style={styles.titleTxt}>Boot Trap</Text>
        <Text style={styles.subTxt}>"X" only Tic-Tac-Toe</Text>
      </View>
      <Icon
        name="menu"
        size={40}
        color={COLOR_BLACK}
        onPress={props.navigation.toggleDrawer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_YELLOW,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 50,
    height: 50,
  },
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    fontFamily: KALAM_BOLD,
    fontSize: 24,
    color: COLOR_BLACK,
    textDecorationLine: 'underline',
  },
  subTxt: {
    fontFamily: KALAM_LIGHT,
    fontSize: 14,
    color: COLOR_BLACK,
  },
});

export default Header;
