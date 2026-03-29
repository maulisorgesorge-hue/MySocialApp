import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen = () => {
  // डमी डेटा (जो बाद में आपके सर्वर से आएगा)
  const [notifications, setNotifications] = useState([
    { id: '1', user: 'rahul_vibe', type: 'like', time: '2m', img: 'https://via.placeholder.com/50' },
    { id: '2', user: 'sonia_art', type: 'follow', time: '15m', img: 'https://via.placeholder.com/50' },
    { id: '3', user: 'amit_tech', type: 'comment', time: '1h', msg: 'Great reel! 🔥', img: 'https://via.placeholder.com/50' },
    { id: '4', user: 'vibe_official', type: 'system', time: '2h', msg: 'Your reel crossed 20,000 views! 🎉', img: 'https://via.placeholder.com/50' },
  ]);

  const renderIcon = (type) => {
    switch (type) {
      case 'like': return <Ionicons name="heart" size={18} color="#FF0000" />;
      case 'follow': return <Ionicons name="person-add" size={18} color="#0095f6" />;
      case 'comment': return <Ionicons name="chatbubble" size={18} color="#555" />;
      default: return <Ionicons name="notifications" size={18} color="#FFD700" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.notiItem}>
            <Image source={{ uri: item.img }} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.notiText}>
                <Text style={styles.userName}>{item.user} </Text>
                {item.type === 'like' && 'liked your reel.'}
                {item.type === 'follow' && 'started following you.'}
                {item.type === 'comment' && `commented: ${item.msg}`}
                {item.type === 'system' && item.msg}
              </Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <View style={styles.iconBadge}>
              {renderIcon(item.type)}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  header: { paddingHorizontal: 20, paddingBottom: 15, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  notiItem: { flexDirection: 'row', padding: 15, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#f9f9f9' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  textContainer: { flex: 1 },
  userName: { fontWeight: 'bold', color: '#000' },
  notiText: { fontSize: 14, color: '#333', lineHeight: 20 },
  timeText: { fontSize: 12, color: '#999', marginTop: 3 },
  iconBadge: { marginLeft: 10 },
});

export default NotificationScreen;
        
