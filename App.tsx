import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {
  DrawerHeaderProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {COLOR_BLACK, COLOR_WHITE, COLOR_YELLOW} from './utils/colors';
import Header from './components/Header';
import Game from './components/Game';
import Settings from './components/Settings';
import Donate from './components/Donate';
import Rules from './components/Rules';
import {KALAM_BOLD} from './utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {navigationRef} from './definitions';

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

function DonateDrawerIcon() {
  return <MaterialIcons name="currency-rupee" size={20} color={COLOR_BLACK} />;
}

function App(): React.JSX.Element {
  useEffect(() => SplashScreen.hide(), []);
  const header = (props: DrawerHeaderProps) => <Header {...props} />;
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar backgroundColor={COLOR_BLACK} />
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
            name="Donate"
            component={Donate}
            options={{
              drawerIcon: DonateDrawerIcon,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
