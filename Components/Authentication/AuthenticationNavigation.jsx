import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationPage from './AuthenticationPage';
import InscriptionPage from './InscriptionPage';
export default function AuthenticationNavigation(){
    const AuthenticationStack = createStackNavigator();
    return (
        <AuthenticationStack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName='AuthenticationPage'>
            <AuthenticationStack.Screen name='AuthenticationPage' component={AuthenticationPage}/>
            <AuthenticationStack.Screen name='InscriptionPage' component={InscriptionPage}/>
        </AuthenticationStack.Navigator>
    )
}
    


