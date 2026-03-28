import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// आपकी असली फाइलों के नामों के हिसाब से सही किए गए Imports
import HomeScreen from './index';             // आपकी फाइल index.js है
import ReelsScreen from './Reels';           // आपकी फाइल Reels.js है
import LiveScreen from './live-system';      // आपकी फाइल live-system.js है
import ProfileScreen from './profile-system'; // आपकी फाइल profile-system.js है

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Reels') iconName = 'play-circle';
            else if (route.name === 'Live') iconName = 'videocam';
            else if (route.name === 'Profile') iconName = 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Reels" component={ReelsScreen} />
        <Tab.Screen name="Live" component={LiveScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
        }
