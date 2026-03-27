import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function App() {
  const [likes, setLikes] = useState(500);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>VibeTube</Text>
        <Ionicons name="search" size={26} color="black" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ytPost}>
          <View style={styles.videoThumbnail}>
            <Ionicons name="play-circle" size={60} color="white" />
          </View>
          <View style={styles.videoInfo}>
            <View style={styles.userIcon} />
            <View>
              <Text style={styles.videoTitle}>VibeTube: My New Video</Text>
              <Text style={styles.videoStats}>User • 1.2M views</Text>
            </View>
          </View>

          <View style={styles.interactionBar}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={28} 
                color={isLiked ? "red" : "black"} 
              />
              <Text style={styles.actionText}>{likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={24} color="black" />
              <Text style={styles.actionText}>45</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Ionicons name="home" size={28} color="red" />
        <Ionicons name="play-box" size={28} color="gray" />
        <View style={styles.uploadBtn}><Ionicons name="add" size={30} color="white" /></View>
        <Ionicons name="send" size={28} color="gray" />
        <Ionicons name="person" size={28} color="gray" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15 },
  logo: { fontSize: 26, fontWeight: 'bold', color: 'red' },
  ytPost: { marginBottom: 20 },
  videoThumbnail: { width: width, height: 220, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  videoInfo: { flexDirection: 'row', padding: 12 },
  userIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ccc', marginRight: 10 },
  videoTitle: { fontSize: 16, fontWeight: '600', width: width - 80 },
  videoStats: { color: 'gray', fontSize: 12 },
  interactionBar: { flexDirection: 'row', paddingHorizontal: 15, paddingBottom: 15 },
  actionButton: { flexDirection: 'row', alignItems: 'center', marginRight: 25 },
  actionText: { marginLeft: 5, fontWeight: 'bold' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, borderTopWidth: 0.5, borderColor: '#ccc' },
  uploadBtn: { backgroundColor: 'red', width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center' }
});
