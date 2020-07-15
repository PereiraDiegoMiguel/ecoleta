import React from 'react';
import { View, ImageBackground, Text, Image, StyleSheet, TextBase } from 'react-native';
import { AppLoading } from 'expo'
import { StatusBar } from 'react-native'
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';

import Routes from './src/routes'

export default function App() {
  const [fontsLoadead] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if (!fontsLoadead) {
    return <AppLoading />
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>

  );
}



