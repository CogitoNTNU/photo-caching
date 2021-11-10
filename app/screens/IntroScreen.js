import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Image} from 'react-native';
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/core';

const IntroScreen = () => {
    return (
      <Onboarding
      //onSkip={() => navigation.replace("")};
      //onDone={() => navigation.replace("")};
      pages={[
        {
          backgroundColor: '#13395b',
          image: <Image source={{uri: 'https://cogitontnu.no/static/static/media/logo_white.8d6f8fb9.svg',}} />,
          title: 'Welcome to PhotoCaching',
          subtitle: 'Sit through this tutorial to learn how to use PhotoCaching',
        },
        {
          backgroundColor: '#13395b',
          image: <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}} />,
          title: 'Picking a spot',
          subtitle: 'Move around your neighborhood',
        },
        {
          backgroundColor: '#13395b',
          image: <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}} />,
          title: 'Taking pictures',
          subtitle: 'You will be given a picture. Try replicating the picture given to the best of your ability',
        },
        {
          backgroundColor: '#13395b',
          image: <Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}} />,
          title: 'Score',
          subtitle: 'You will recieve a score based on how similar your picture is to the original',
        },
      ]}
    />
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
  
