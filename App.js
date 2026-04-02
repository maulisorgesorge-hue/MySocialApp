import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

// आपकी बनाई हुई फाइल्स को इम्पोर्ट कर रहे हैं
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import ReelsScreen from './Reels'; 
import ShopScreen from './ShopScreen'; 
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Reels') {
              iconName = focused ? 'play-circle' : 'play-circle-outline';
            } else if (route.name === 'Shop') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FE2C55', // Instagram/Reels जैसा रेड-पिंक कलर
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: styles.tabBar,
          headerShown: false, // ऊपर का फालतू हेडर हटा दिया
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Reels" component={ReelsScreen} />
        <Tab.Screen name="Shop" component={ShopScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    height: 65,
    paddingBottom: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#dbdbdb',
  },
});
        
