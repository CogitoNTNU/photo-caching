import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Create store.js
import { Provider } from "react-redux";
import HomeScreen from './screens/HomeScreen';
import IntroScreen from './screens/IntroScreen';
import { store } from './store';
import MapScreen from './screens/MapScreen';
//import AsyncStorage from '@react-native-community/async-storage';

export default function App() {
  return (
    <IntroScreen />
  )
  
  /*const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

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
  }*/
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
