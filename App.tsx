import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import DrawerNavigator from './components/DrawerNavigator';
import {StatusBar} from 'react-native';
import {COLOR_BLACK} from './utils';
import {loadAllMusic} from './utils/sound';

function App() {
  useEffect(() => SplashScreen.hide(), []);
  useEffect(() => loadAllMusic(), []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={COLOR_BLACK} />
      <DrawerNavigator />
    </Provider>
  );
}

export default App;
