import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Image} from 'react-native';
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import MapView from 'react-native-maps';
import Map from '../components/Map';

const markers = [
  {
      id: 1,
      text: 'Samf',
      img: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Studentersamfundet_i_Trondhjem%2C_front.jpeg',
      lat: 63.422407,
      lng: 10.394986
  },
  {
      id: 2,  
      text: 'Gløs',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/NTNU_Trondheim_Mainbuilding.jpg/240px-NTNU_Trondheim_Mainbuilding.jpg',
      lat: 63.4346,
      lng: 10.3985
  }
]

const MapScreen = () => {
    return (
      <View>
        <View style={tw`h-full`}>
          <Map markers={markers}/>
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
  
