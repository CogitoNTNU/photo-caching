import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Image} from 'react-native';
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';

const IntroScreen = () => {
    return (
        <View style={tw`bg-white h-full`}>
            <Text style={[tw`text-red-500 p-10`, styles.text]}>
              Tester introen
            </Text>
            <StatusBar style="dark" />
        </View>
    )
}

export default IntroScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 60
    }
  });
  
