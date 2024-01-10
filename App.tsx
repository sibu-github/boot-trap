import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {COLOR_BLACK, COLOR_WHITE} from './utils/colors';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLOR_BLACK : COLOR_WHITE,
  };

  const {height} = Dimensions.get('window');
  const wrapperView = {
    minHeight: height,
    backgroundColor: isDarkMode ? COLOR_BLACK : COLOR_WHITE,
  };
  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{}}>
        <View style={wrapperView}>
          <Text>Hello World!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    minHeight: '100%',
    backgroundColor: 'yellow',
  },
});

export default App;
