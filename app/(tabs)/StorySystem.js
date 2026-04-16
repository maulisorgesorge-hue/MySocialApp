import React from 'react';
import { View, Text, ScrollView } from 'react-native';
export default function StorySystem() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{padding: 10}}>
      {[1,2,3,4,5].map(i => (
        <View key={i} style={{width: 60, height: 60, borderRadius: 30, backgroundColor: '#ddd', marginRight: 10, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 10}}>User {i}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
