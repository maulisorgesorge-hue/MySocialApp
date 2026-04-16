import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ReelsScreen from './Reels';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ 
        tabBarActiveTintColor: '#FF0000',
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff'
      }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Reels" component={ReelsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
