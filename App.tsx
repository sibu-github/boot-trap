import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {
  DrawerHeaderProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {COLOR_BLACK} from './utils/colors';
import Header from './components/Header';
import Game from './components/Game';
import Settings from './components/Settings';
import Donate from './components/Donate';
import Rules from './components/Rules';

const Drawer = createDrawerNavigator();

function App(): React.JSX.Element {
  useEffect(() => SplashScreen.hide(), []);
  const header = (props: DrawerHeaderProps) => <Header {...props} />;
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLOR_BLACK} />
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          drawerPosition: 'right',
          header,
        }}
        initialRouteName="Rules">
        <Drawer.Screen name="Game" component={Game} />
        <Drawer.Screen name="Rules" component={Rules} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Donate" component={Donate} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
