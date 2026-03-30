import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// आपकी सभी फाइल्स के इम्पोर्ट्स
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import ReelsScreen from './Reels';
import ShopScreen from './shop-system';
import ProfileScreen from './ProfileScreen';
import MonetizationScreen from './Monetization';
import NotificationScreen from './notification-system';
import SettingsScreen from './settings-system';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// प्रोफाइल के अंदर की सेटिंग्स के लिए Stack
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: 'My Profile' }} />
      <Stack.Screen name="Monetization" component={MonetizationScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Search') iconName = 'search';
            else if (route.name === 'Reels') iconName = 'play-circle';
            else if (route.name === 'Shop') iconName = 'cart';
            else if (route.name === 'Profile') iconName = 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff0000',
          tabBarInactiveTintColor: 'gray',
          headerShown: false, // स्क्रीन के ऊपर वाले नाम को छिपाने के लिए
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Reels" component={ReelsScreen} />
        <Tab.Screen name="Shop" component={ShopScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
                }
        
