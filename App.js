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
import UserNavigation from './Components/User/UserNavigation';
import Settings from './Components/Common/Settings';
import AuthentificationPage from './Components/Authentication/AuthentificationPage';
import InscriptionPage from './Components/Authentication/InscriptionPage';

const Stack = createStackNavigator();
export default function App() {
  return (
    <>
    <CustomAppBar />
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={AuthentificationPage}
          options={{
            tabBarIcon: () => (
              <Image source={require('./assets/icons/house.png')}
                style={{ width: 20, height: 20 }} />
            )
          }} />
        <Stack.Screen
          name="For You"
          component={UserForYou}
          options={{
            tabBarIcon: () => (
              <Image source={require('./assets/icons/for-you.png')}
                style={{ width: 20, height: 20 }} />
            )
          }} />
        <Stack.Screen
          name="Explore"
          component={UserExplore}
          options={{
            tabBarIcon: () => (
              <Image source={require('./assets/icons/compass.png')}
                style={{ width: 20, height: 20 }} />
            )
          }} />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: () => (
              <Image source={require('./assets/icons/tools.png')}
                style={{ width: 20, height: 20 }} />
            )
          }} />
      </Stack.Navigator>
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
