import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomAppBar from '../Common/CustomAppBar';
import Settings from '../Common/Settings';
import UserMainPage from './UserMainPage';
import UserExplore from './UserExplore';
import UserForYou from './UserForYou';
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
                  <Image source={require('../../assets/icons/house.png')}
                    style={{ width: 20, height: 20 }} />
                )
              }} />
            <Tab.Screen
              name="For You"
              component={UserForYou}
              options={{
                tabBarIcon: () => (
                  <Image source={require('../../assets/icons/for-you.png')}
                    style={{ width: 20, height: 20 }} />
                )
              }} />
            <Tab.Screen
              name="Explore"
              component={UserExplore}
              options={{
                tabBarIcon: () => (
                  <Image source={require('../../assets/icons/compass.png')}
                    style={{ width: 20, height: 20 }} />
                )
              }} />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarIcon: () => (
                  <Image source={require('../../assets/icons/tools.png')}
                    style={{ width: 20, height: 20 }} />
                )
              }} />
          </Tab.Navigator>
        </>
    )  
}
