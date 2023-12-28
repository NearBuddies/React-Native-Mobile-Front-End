import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { NavigationContainer, DefaultTheme, useLinking } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  
import { createStackNavigator } from '@react-navigation/stack';
import { MyTheme } from './Variables';
import AuthenticationPage from './Components/Authentication/AuthenticationPage';
import InscriptionPage from './Components/Authentication/InscriptionPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
export default function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const authenticateUser = async () =>{
    // Get the username and the password
    const username = AsyncStorage.getItem("username");
    const password = AsyncStorage.getItem("password");
    // Send and authentication request using axios
      // If the user is authenticated
        //Store his id
        // return true
          // he will be directly on user navigation, with his id
            //Not implemented yet
      // Else 
        //return false
          // he will be directly on authentication navigation
            // Not implemented yet
              return false;
  }
  return (
    <>
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName={
        async () => {
          const auth = await authenticateUser();
          return auth === true ? 'UserNavigation' : 'AuthenticationNavigation';
        }
      }
      >
        <Stack.Screen
          name="AuthenticationNavigation"
          component={AuthenticationPage}
        />
        <Stack.Screen
          name="UserNavigation"
          component={InscriptionPage}
        />
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
