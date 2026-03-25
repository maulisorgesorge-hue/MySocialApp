import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState('home'); // home, search, profile

  // --- लॉगिन होने के बाद का नजारा ---
  if (isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>SocialStream</Text>
          <View style={styles.headerIcons}>
            <Text style={styles.icon}>❤️</Text>
            <Text style={styles.icon}>💬</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          {/* 1. HOME PAGE */}
          {currentTab === 'home' && (
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Stories */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesSection}>
                {['Your Story', 'Rahul', 'Sneha', 'Amit', 'Priya', 'Sonal'].map((u, i) => (
                  <View key={i} style={styles.storyContainer}>
                    <View style={styles.storyCircle} />
                    <Text style={styles.smallText}>{u}</Text>
                  </View>
                ))}
              </ScrollView>
              {/* Post */}
              <View style={styles.post}>
                <View style={styles.postHeader}><View style={styles.avatarSmall} /><Text style={styles.boldText}>mauli_sorge</Text></View>
                <Image source={{ uri: 'https://picsum.photos/600/600' }} style={styles.postImage} />
                <View style={styles.postActions}><Text style={styles.icon}>❤️ 💬 ✈️</Text></View>
                <Text style={styles.likes}>1,234 likes</Text>
                <Text style={styles.caption}><Text style={styles.boldText}>mauli_sorge</Text> Coding my own Instagram! 🔥</Text>
              </View>
            </ScrollView>
          )}

          {/* 2. SEARCH PAGE */}
          {currentTab === 'search' && (
            <View style={{ flex: 1 }}>
              <TextInput style={styles.searchBar} placeholder="Search" placeholderTextColor="#8e8e8e" />
              <ScrollView><View style={styles.gridContainer}>
                {[1,2,3,4,5,6,7,8,9].map(i => (
                  <Image key={i} source={{ uri: `https://picsum.photos/200/200?random=${i}` }} style={styles.gridImage} />
                ))}
              </View></ScrollView>
            </View>
          )}

          {/* 3. PROFILE PAGE */}
          {currentTab === 'profile' && (
            <View style={{ flex: 1 }}>
              <View style={styles.profileInfo}>
                <View style={styles.avatarProfile} />
                <View style={styles.stats}><Text style={styles.boldText}>15</Text><Text>Posts</Text></View>
                <View style={styles.stats}><Text style={styles.boldText}>520</Text><Text>Followers</Text></View>
              </View>
              <Text style={[styles.boldText, {marginLeft: 20}]}>Mauli Sorge</Text>
              <TouchableOpacity style={styles.editBtn}><Text style={styles.boldText}>Edit Profile</Text></TouchableOpacity>
            </View>
          )}
        </View>

        {/* Bottom Navigation Tabs */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => setCurrentTab('home')}><Text style={styles.navIcon}>🏠</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentTab('search')}><Text style={styles.navIcon}>🔍</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentTab('profile')}><Text style={styles.navIcon}>👤</Text></TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- लॉगिन पेज (जो आपको अभी दिख रहा है) ---
  return (
    <SafeAreaView style={styles.loginContainer}>
      <Text style={styles.logoLarge}>SocialStream</Text>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TouchableOpacity style={styles.loginBtn} onPress={() => setIsLoggedIn(true)}>
        <Text style={styles.loginBtnText}>Log In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loginContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logoLarge: { fontSize: 40, fontWeight: 'bold', marginBottom: 40 },
  input: { width: '100%', height: 45, backgroundColor: '#fafafa', borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 5, paddingHorizontal: 10, marginBottom: 15 },
  loginBtn: { width: '100%', height: 45, backgroundColor: '#3797f0', borderRadius: 5, justifyContent: 'center', alignItems: 'center' },
  loginBtnText: { color: '#fff', fontWeight: 'bold' },
  header: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, borderBottomWidth: 0.5, borderColor: '#dbdbdb', marginTop: 30 },
  logoText: { fontSize: 24, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row' },
  icon: { fontSize: 22, marginLeft: 15 },
  storiesSection: { padding: 10, borderBottomWidth: 0.5, borderColor: '#dbdbdb' },
  storyContainer: { alignItems: 'center', marginRight: 15 },
  storyCircle: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#dbdbdb', borderWidth: 2, borderColor: '#f09433' },
  post: { marginTop: 10 },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  avatarSmall: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#dbdbdb', marginRight: 10 },
  postImage: { width: width, height: width },
  postActions: { padding: 10 },
  likes: { fontWeight: 'bold', paddingHorizontal: 10 },
  caption: { paddingHorizontal: 10 },
  boldText: { fontWeight: 'bold' },
  smallText: { fontSize: 11, marginTop: 5 },
  searchBar: { height: 40, backgroundColor: '#efefef', margin: 10, borderRadius: 10, paddingHorizontal: 15 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  gridImage: { width: width/3 - 2, height: width/3, margin: 1 },
  profileInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: 20 },
  avatarProfile: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#dbdbdb' },
  stats: { alignItems: 'center' },
  editBtn: { backgroundColor: '#efefef', margin: 20, height: 35, borderRadius: 5, justifyContent: 'center', alignItems: 'center' },
  navBar: { height: 60, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 0.5, borderColor: '#dbdbdb' },
  navIcon: { fontSize: 26 }
});
            
