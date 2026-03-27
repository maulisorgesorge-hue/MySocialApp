import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function App() {
  // Like के लिए State (शुरुआत में 500 लाइक्स)
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>VibeTube</Text>
        <View style={{flexDirection: 'row'}}>
           <Ionicons name="notifications-outline" size={26} color="black" style={{marginRight: 15}} />
           <Ionicons name="search" size={26} color="black" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyArea}>
          {[1,2,3,4,5].map(i => <View key={i} style={styles.storyCircle} />)}
        </ScrollView>

        {/* Video Posts */}
        <Text style={styles.sectionTitle}>Trending Videos</Text>
        
        <View style={styles.ytPost}>
          <View style={styles.videoThumbnail}>
            <Ionicons name="play-circle" size={60} color="white" />
          </View>
          <View style={styles.videoInfo}>
            <View style={styles.userIcon} />
            <View>
              <Text style={styles.videoTitle}>VibeTube: India's New Super App</Text>
              <Text style={styles.videoStats}>SuperTeam • 1M views</Text>
            </View>
          </View>

          {/* --- नया Like बटन यहाँ है --- */}
          <View style={styles.interactionBar}>
            <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={26} 
                color={isLiked ? "red" : "black"} 
              />
              <Text style={styles.likeText}>{likes} Likes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.likeButton}>
              <Ionicons name="chatbubble-outline" size={24} color="black" />
              <Text style={styles.likeText}>Comment</Text>
            </TouchableOpacity>
          </View>
          {/* --------------------------- */}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
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
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' },
  logo: { fontSize: 28, fontWeight: 'bold', color: 'red' },
  storyArea: { paddingLeft: 10, paddingVertical: 10, borderBottomWidth: 0.5, borderColor: '#eee' },
  storyCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#ddd', borderWidth: 2, borderColor: 'red', marginRight: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', padding: 15 },
  ytPost: { marginBottom: 20 },
  videoThumbnail: { width: width, height: 220, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  videoInfo: { flexDirection: 'row', padding: 12 },
  userIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ccc', marginRight: 10 },
  videoTitle: { fontSize: 16, fontWeight: '600', width: width - 80 },
  videoStats: { color: 'gray', fontSize: 12 },
  
  // नए स्टाइल
  interactionBar: { flexDirection: 'row', paddingHorizontal: 15, paddingBottom: 10 },
  likeButton: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  likeText: { marginLeft: 5, fontWeight: 'bold', fontSize: 14 },

  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, borderTopWidth: 0.5, borderColor: '#ccc' },
  uploadBtn: { backgroundColor: 'red', width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center' }
});
