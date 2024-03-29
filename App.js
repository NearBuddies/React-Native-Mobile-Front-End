import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthenticationNavigation from './Components/Authentication/AuthenticationNavigation';
import UserNavigation from './Components/User/UserNavigation';
import UserStack from './Components/User/UserStack';
import NewEvent from './Components/Event/NewEvent';
import AddCreditsPage from './Components/Event/addCredits';
import {CreditsConverterPage} from './Components/Event/CreditsConverterPage';
import { authenticate } from './Components/Authentication/Services/AuthenticationService';
import { MyTheme } from './Variables';

const Stack = createStackNavigator();

const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        // Get the username and the password
        const username = await AsyncStorage.getItem("username");
        const password = await AsyncStorage.getItem("password");
        const authenticateBool = await authenticate(username,password)
        if (authenticateBool){
          // Set userAuthenticated to true
          setUserAuthenticated(true);
        } else {
          // Set userAuthenticated to false
          setUserAuthenticated(false);
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
      }
    };

    // Use the function
    authenticateUser()

  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userAuthenticated ? (
          <>
            <Stack.Screen name="UserStack" component={UserStack} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="AuthenticationNavigation"
              component={AuthenticationNavigation}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
  /*return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="AddCreditsPage"
              component={AddCreditsPage}
            />
            <Stack.Screen name='CreditsConverterPage' component={CreditsConverterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );*/
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App ;