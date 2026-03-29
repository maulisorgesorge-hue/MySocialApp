import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const DUMMY_STORIES = [
  { id: '1', user: 'My Story', img: 'https://via.placeholder.com/100/FF0000/FFFFFF?text=You' },
  { id: '2', user: 'Rahul', img: 'https://via.placeholder.com/100/00FF00/FFFFFF?text=R' },
  { id: '3', user: 'Amit', img: 'https://via.placeholder.com/100/0000FF/FFFFFF?text=A' },
  { id: '4', user: 'Sonia', img: 'https://via.placeholder.com/100/FFFF00/000000?text=S' },
  { id: '5', user: 'Vibe', img: 'https://via.placeholder.com/100/FF00FF/FFFFFF?text=V' },
];

const StorySystem = () => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={DUMMY_STORIES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.storyCircle}>
            <View style={styles.border}>
              <Image source={{ uri: item.img }} style={styles.image} />
            </View>
            <Text style={styles.username} numberOfLines={1}>{item.user}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb', backgroundColor: '#fff' },
  storyCircle: { alignItems: 'center', marginHorizontal: 8 },
  border: { width: 68, height: 68, borderRadius: 34, borderWidth: 2, borderColor: '#FF0000', padding: 2, justifyContent: 'center', alignItems: 'center' },
  image: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#eee' },
  username: { fontSize: 11, marginTop: 4, color: '#262626', width: 70, textAlign: 'center' }
});

export default StorySystem;
          
