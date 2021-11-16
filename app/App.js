import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Create store.js
import { Provider } from "react-redux";
import { store } from './store';

//Screens
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';

//import AsyncStorage from '@react-native-community/async-storage';
import CameraScreen from './screens/CameraScreen';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
  /*
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value == null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    })
  }, []);

  if ( isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true){ // FIRST LAUNCH
    return (
      <Provider store={store}>
        <MapScreen />
      </Provider>
    )
  } else { // NOT FIRST LAUNCH
    return <Provider store={store}>
        <IntroScreen />
      </Provider>
  }
  */
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{headerShown:false}}
          />
          <Stack.Screen
            name="Cam"
            component={CameraScreen}
            options={{headerShown:false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown:false}}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20
  }
});
