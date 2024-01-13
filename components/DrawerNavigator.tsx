import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  DrawerHeaderProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Header from './Header';
import {navigationRef} from '../definitions';
import {NavigationContainer} from '@react-navigation/native';
import {COLOR_BLACK, COLOR_WHITE, COLOR_YELLOW, KALAM_BOLD} from '../utils';
import Game from './Game';
import Rules from './Rules';
import Settings from './Settings';
import AboutUs from './AboutUs';

const Drawer = createDrawerNavigator();

function GameDrawerIcon() {
  return (
    <MaterialCommunityIcons
      name="gamepad-circle"
      size={20}
      color={COLOR_BLACK}
    />
  );
}

function RulesDrawerIcon() {
  return <MaterialIcons name="rule" size={20} color={COLOR_BLACK} />;
}

function SettingsDrawerIcon() {
  return <SimleLineIcons name="settings" size={20} color={COLOR_BLACK} />;
}

function AboutUsDrawerIcon() {
  return <AntDesign name="team" size={20} color={COLOR_BLACK} />;
}

function DrawerNavigator() {
  const header = (props: DrawerHeaderProps) => <Header {...props} />;

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        screenOptions={{
          drawerContentStyle: {
            backgroundColor: COLOR_YELLOW,
          },
          drawerActiveTintColor: COLOR_BLACK,
          drawerActiveBackgroundColor: COLOR_WHITE,
          drawerLabelStyle: {
            fontFamily: KALAM_BOLD,
            fontSize: 20,
            color: COLOR_BLACK,
          },
          headerShown: true,
          drawerPosition: 'right',
          header,
        }}
        initialRouteName="Rules">
        <Drawer.Screen
          name="Game"
          component={Game}
          options={{
            drawerIcon: GameDrawerIcon,
          }}
        />
        <Drawer.Screen
          name="Rules"
          component={Rules}
          options={{
            drawerIcon: RulesDrawerIcon,
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerIcon: SettingsDrawerIcon,
          }}
        />
        <Drawer.Screen
          name="About Us"
          component={AboutUs}
          options={{
            drawerIcon: AboutUsDrawerIcon,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
