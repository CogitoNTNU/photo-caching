import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Create store.js
import { Provider } from "react-redux";
import { store } from './store';

//Screens
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import CameraScreen from './screens/CameraScreen';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
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
