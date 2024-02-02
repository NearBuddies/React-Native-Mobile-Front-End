import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomAppBar from '../Common/CustomAppBar';
import Settings from '../Common/Settings';
import UserMainPage from './UserMainPage';
import UserExplore from './UserExplore';
import UserForYou from './UserForYou';
import { Feather } from '@expo/vector-icons'
export default function UserNavigation(){
    const Tab = createBottomTabNavigator();
    return(
        <>
        <CustomAppBar/>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name="Home"
              component={UserMainPage}
              options={{
                tabBarIcon: () => (
                  <Feather name="home" size={24} color="#ec6a6d"/>
                )
              }} />
            <Tab.Screen
              name="Buy credits"
              component={UserForYou}
              options={{
                tabBarIcon: () => (
                  <Feather name="dollar-bill" size={24} color="#ec6a6d"/>
                )
              }} />
            <Tab.Screen
              name="Explore"
              component={UserExplore}
              options={{
                tabBarIcon: () => (
                  <Feather name="compass" size={24} color="#ec6a6d"/>
                )
              }} />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarIcon: () => (
                  <Feather name="settings" size={24} color="#ec6a6d"/>
                )
              }} />
          </Tab.Navigator>
        </>
    )  
}
