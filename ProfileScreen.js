import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ⚙️ Header & Settings */}
      <View style={styles.header}>
        <Text style={styles.username}>your_username</Text>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>

      {/* 👤 Profile Info */}
      <View style={styles.profileInfo}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={styles.profilePic} />
        <View style={styles.statsContainer}>
          <View style={styles.statBox}><Text style={styles.statNumber}>12</Text><Text style={styles.statLabel}>Posts</Text></View>
          <View style={styles.statBox}><Text style={styles.statNumber}>540</Text><Text style={styles.statLabel}>Followers</Text></View>
          <View style={styles.statBox}><Text style={styles.statNumber}>180</Text><Text style={styles.statLabel}>Following</Text></View>
        </View>
      </View>

      {/* 📝 Bio & Edit Button */}
      <View style={styles.bioSection}>
        <Text style={styles.fullName}>Name Here</Text>
        <Text style={styles.bioText}>Creator | Explorer 🌍 | 1 Min Stories 🎥</Text>
        <TouchableOpacity style={styles.editButton}><Text style={styles.editButtonText}>Edit Profile</Text></TouchableOpacity>
      </View>

      {/* ⭐ Highlights */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightSection}>
        {['Vibes', 'Travel', 'Food'].map((item, index) => (
          <View key={index} style={styles.highlightBox}>
            <View style={styles.highlightCircle} />
            <Text style={styles.highlightText}>{item}</Text>
          </View>
        ))}
      </ScrollView>

      {/* 🖼️ Posts Grid */}
      <View style={styles.gridContainer}>
        {[1,2,3,4,5,6,7,8,9].map((i) => (
          <Image key={i} source={{ uri: `https://picsum.photos/200/200?random=${i}` }} style={styles.gridImage} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center', marginTop: 30 },
  username: { fontSize: 22, fontWeight: 'bold' },
  profileInfo: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  profilePic: { width: 80, height: 80, borderRadius: 40, marginRight: 30 },
  statsContainer: { flexDirection: 'row', flex: 1, justifyContent: 'space-around' },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 13, color: 'gray' },
  bioSection: { paddingHorizontal: 15 },
  fullName: { fontWeight: 'bold' },
  bioText: { color: '#333', marginBottom: 15 },
  editButton: { backgroundColor: '#EFEFEF', padding: 8, borderRadius: 5, alignItems: 'center' },
  editButtonText: { fontWeight: '600' },
  highlightSection: { padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#dbdbdb' },
  highlightBox: { alignItems: 'center', marginRight: 15 },
  highlightCircle: { width: 55, height: 55, borderRadius: 27.5, backgroundColor: '#EFEFEF', borderWidth: 1, borderColor: '#dbdbdb' },
  highlightText: { fontSize: 11, marginTop: 5 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  gridImage: { width: width / 3 - 1, height: width / 3 - 1, margin: 0.5 }
});
  
