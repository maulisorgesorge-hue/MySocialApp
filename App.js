import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// 1. यहाँ सुनिश्चित करें कि आपकी फाइलों के नाम सही हैं
import HomeScreen from './HomeScreen'; 
import SearchScreen from './SearchScreen'; // आपने इसे search-system नाम दिया था, इसे बदल लें
import ProfileScreen from './ProfileScreen'; // यह आपकी नई प्रोफाइल फाइल है
import MonetizationScreen from './Monetization'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// प्रोफाइल के अंदर Monetization खोलने के लिए Stack
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Monetization" component={MonetizationScreen} options={{ title: 'Monetization' }} />
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
            // 2. नीचे वाले नेविगेशन बार के आइकॉन
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Search') iconName = 'search';
            else if (route.name === 'Profile') iconName = 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF0000', // एक्टिव होने पर लाल रंग
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
} // फालतू ब्रैकेट हटा दिया गया है
          
