import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { NavigationContainer, DefaultTheme, useLinking } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  
import { createStackNavigator } from '@react-navigation/stack';
import { MyTheme } from './Variables';
import UserMainPage from './Components/User/UserMainPage';
import UserExplore from './Components/User/UserExplore';
import UserForYou from './Components/User/UserForYou';
import CustomAppBar from './Components/Common/CustomAppBar';
import Settings from './Components/Common/Settings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function App() {
  return (
    <>
    <CustomAppBar />
    <NavigationContainer theme={MyTheme}>
      

    </NavigationContainer></>
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
