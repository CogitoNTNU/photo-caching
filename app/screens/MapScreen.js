import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Image} from 'react-native';
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import MapView from 'react-native-maps';
import Map from '../components/Map';


const MapScreen = () => {
    return (
      <View>
        <View style={tw`h-full`}>
          <Map />
        </View>
      </View>
    )
}

export default MapScreen

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
  
