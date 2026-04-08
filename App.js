import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// आपकी तस्वीरों (1000054971.jpg और 1000054973.jpg) के हिसाब से सही इंपोर्ट्स
import HomeScreen from './HomeScreen'; 
import SearchScreen from './SearchScreen'; // आपकी लिस्ट में SearchScreen.js है
import ReelsScreen from './Reels';       // आपकी लिस्ट में Reels.js है
import ShopScreen from './shop-system';   // आपकी लिस्ट में shop-system.js है
import ProfileScreen from './ProfileScreen'; // आपकी लिस्ट में ProfileScreen.js है

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
            else if (route.name === 'Reels') iconName = focused ? 'play-circle' : 'play-circle-outline';
            else if (route.name === 'Shop') iconName = focused ? 'cart' : 'cart-outline';
            else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FE2C55',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
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
