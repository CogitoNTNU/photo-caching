import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Create store.js
import { Provider } from "react-redux";
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import MapScreen from './screens/MapScreen';

export default function App() {
  return (
    <Provider store={store}>
      <MapScreen />
    </Provider>
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
