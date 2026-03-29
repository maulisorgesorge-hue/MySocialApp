import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* 1. Top Bar (Username & Settings) */}
      <View style={styles.topBar}>
        <Text style={styles.usernameText}>your_username_123</Text>
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => alert("Upload Video")}>
            <Feather name="plus-square" size={24} color="black" style={{marginRight: 15}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Settings Menu")}>
            <Ionicons name="menu-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 2. Profile Info Section (Photo, Followers, Following) */}
        <View style={styles.profileHeader}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/300' }} 
              style={styles.profileImage} 
            />
            <TouchableOpacity style={styles.addIcon}>
              <Ionicons name="add-circle" size={22} color="#0095f6" />
            </TouchableOpacity>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}><Text style={styles.statNumber}>12</Text><Text style={styles.statLabel}>Posts</Text></View>
            <View style={styles.statBox}><Text style={styles.statNumber}>1.2k</Text><Text style={styles.statLabel}>Followers</Text></View>
            <View style={styles.statBox}><Text style={styles.statNumber}>150</Text><Text style={styles.statLabel}>Following</Text></View>
          </View>
        </View>

        {/* 3. Bio Section */}
        <View style={styles.bioSection}>
          <Text style={styles.nameLabel}>Full Name Here</Text>
          <Text style={styles.bioText}>VibeTube Creator 🎥 | Tech Lover 💻 | Travel ✈️</Text>
        </View>

        {/* 4. Action Buttons (Edit & Monetization) */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.editButton}><Text style={styles.buttonText}>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity 
            style={styles.monetizationBtn} 
            onPress={() => navigation.navigate('Monetization')}
          >
            <Ionicons name="cash-outline" size={18} color="black" />
            <Text style={[styles.buttonText, {marginLeft: 5}]}>Monetization</Text>
          </TouchableOpacity>
        </View>

        {/* 5. Highlights Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightsArea}>
          {['Vacation', 'Work', 'Food', 'Gym', 'New'].map((item, index) => (
            <View key={index} style={styles.highlightItem}>
              <View style={styles.highlightCircle}>
                <Ionicons name={item === 'New' ? "plus" : "star-outline"} size={24} color="gray" />
              </View>
              <Text style={styles.highlightText}>{item}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 6. Post/Reels Tabs */}
        <View style={styles.tabBar}>
          <Ionicons name="grid-outline" size={24} color="black" />
          <Ionicons name="play-outline" size={24} color="gray" />
          <Ionicons name="person-add-outline" size={24} color="gray" />
        </View>

        {/* 7. Grid of Posts */}
        <View style={styles.postsGrid}>
          {[1,2,3,4,5,6].map((i) => (
            <View key={i} style={styles.gridItem} />
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center', height: 50 },
  usernameText: { fontSize: 20, fontWeight: 'bold' },
  topIcons: { flexDirection: 'row', alignItems: 'center' },
  
  profileHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 },
  imageContainer: { position: 'relative' },
  profileImage: { width: 85, height: 85, borderRadius: 45, backgroundColor: '#eee' },
  addIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white', borderRadius: 10 },
  
  statsContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginLeft: 20 },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 13, color: 'gray' },

  bioSection: { paddingHorizontal: 20, marginTop: 10 },
  nameLabel: { fontWeight: 'bold', fontSize: 14 },
  bioText: { fontSize: 14, color: '#333' },

  buttonRow: { flexDirection: 'row', paddingHorizontal: 15, marginTop: 15, justifyContent: 'space-between' },
  editButton: { flex: 1, height: 35, backgroundColor: '#efefef', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 5 },
  monetizationBtn: { flex: 1, height: 35, backgroundColor: '#efefef', borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontWeight: '600', fontSize: 14 },

  highlightsArea: { paddingLeft: 15, marginTop: 20, marginBottom: 10 },
  highlightItem: { alignItems: 'center', marginRight: 15 },
  highlightCircle: { width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: '#dbdbdb', justifyContent: 'center', alignItems: 'center' },
  highlightText: { fontSize: 11, marginTop: 5 },

  tabBar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#dbdbdb', marginTop: 15 },
  postsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: width / 3 - 1, height: width / 3, backgroundColor: '#eee', margin: 0.5 },
});
  
