import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import UserNavigation from './UserNavigation';
import UserCreateCommunity from './UserCreateCommunity';

export default function UserStack () {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='UserNavigation' component={UserNavigation}/>
            <Stack.Screen name='UserCreateCommunity' component={UserCreateCommunity}/>
        </Stack.Navigator>
    )
}