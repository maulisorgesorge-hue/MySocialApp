import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// --- अपनी फाइलों को यहाँ Import करें ---
// ध्यान दें: अगर फाइल का नाम 'live-system.js' है तो रास्ता './live-system' होगा
import HomeScreen from './Home'; 
import LiveScreen from './live-system'; 
import ReelsScreen from './Reels'; 
import ProfileScreen from './profile-system';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Live') iconName = 'videocam';
          else if (route.name === 'Reels') iconName = 'play-circle';
          else if (route.name === 'Profile') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Live" component={LiveScreen} />
      <Tab.Screen name="Reels" component={ReelsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
