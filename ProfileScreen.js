import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, updateDoc } from "firebase/firestore"; 
import { db, auth } from "./firebase-config"; // पक्का करें कि आपकी फाइल का नाम यही है

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const [isPrivate, setIsPrivate] = useState(false);

  // 🔐 आईडी को पर्सनल (Private) करने का फंक्शन
  const togglePrivacy = async (value) => {
    setIsPrivate(value);
    
    try {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          isPrivate: value
        });
        Alert.alert("Success", value ? "आपकी आईडी अब पर्सनल है" : "आपकी आईडी अब पब्लिक है");
      }
    } catch (error) {
      console.error("Error updating privacy: ", error);
      Alert.alert("Error", "सेटिंग अपडेट नहीं हो पाई");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* ⚙️ Header */}
      <View style={styles.header}>
        <Text style={styles.username}>your_username</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
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

      {/* 📝 Bio & Edit */}
      <View style={styles.bioSection}>
        <Text style={styles.fullName}>Name Here</Text>
        <Text style={styles.bioText}>Creator | Explorer 🌍 | 1 Min Stories 🎥</Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🔒 Privacy Toggle (Personal ID) */}
      <View style={styles.privacyContainer}>
        <Text style={styles.privacyText}>पर्सनल आईडी (Private Account)</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isPrivate ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={togglePrivacy}
          value={isPrivate}
        />
      </View>

      {/* ⭐ Highlights */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightSection}>
        {['Vibes', 'Travel', 'Food', 'New +'].map((item, index) => (
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
  username: { fontSize: 20, fontWeight: 'bold' },
  profileInfo: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  profilePic: { width: 85, height: 85, borderRadius: 42.5, marginRight: 25, borderWidth: 1, borderColor: '#ddd' },
  statsContainer: { flexDirection: 'row', flex: 1, justifyContent: 'space-around' },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 12, color: 'gray' },
  bioSection: { paddingHorizontal: 15 },
  fullName: { fontWeight: 'bold', fontSize: 15 },
  bioText: { color: '#333', marginBottom: 10 },
  actionButtons: { marginBottom: 10 },
  editButton: { backgroundColor: '#EFEFEF', padding: 8, borderRadius: 8, alignItems: 'center' },
  editButtonText: { fontWeight: '600', fontSize: 14 },
  privacyContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#f9f9f9', marginHorizontal: 15, borderRadius: 10, marginBottom: 10 },
  privacyText: { fontSize: 14, fontWeight: '500' },
  highlightSection: { padding: 15, borderTopWidth: 0.5, borderTopColor: '#dbdbdb' },
  highlightBox: { alignItems: 'center', marginRight: 15 },
  highlightCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EFEFEF', borderWidth: 1, borderColor: '#dbdbdb' },
  highlightText: { fontSize: 11, marginTop: 5 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  gridImage: { width: width / 3 - 1, height: width / 3 - 1, margin: 0.5 }
});
            
