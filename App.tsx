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
  Button,
  Image,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {
  DrawerHeaderProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {COLOR_BLACK, COLOR_WHITE, COLOR_YELLOW} from './utils/colors';
import Icon from 'react-native-vector-icons/Entypo';

const LOGO_IMAGE_PATH = './images/logo.png';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

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
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {},
          headerShown: true,
          drawerPosition: 'right',
          // headerStyle: {
          //   backgroundColor: COLOR_YELLOW,
          // },
          // headerTitle: '',
          header: (props: DrawerHeaderProps) => (
            <View
              style={{
                backgroundColor: COLOR_YELLOW,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                source={require(LOGO_IMAGE_PATH)}
                style={{width: 40, height: 40}}
              />
              <Text>Boot Trap</Text>
              <Icon name="menu" size={40} color={COLOR_BLACK} />
            </View>
          ),
        }}
        initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
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
