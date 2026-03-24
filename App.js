import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity, Animated, Dimensions, TextInput, Modal } from 'react-native';
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [storyVisible, setStoryVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastTap = useRef(null);

  // --- डबल टैप लाइक एनीमेशन ---
  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && (now - lastTap.current) < 300) {
      setLiked(true);
      Animated.sequence([
        Animated.spring(animatedValue, { toValue: 1, useNativeDriver: true }),
        Animated.spring(animatedValue, { toValue: 0, useNativeDriver: true }),
      ]).start();
    } else { lastTap.current = now; }
  };

  // --- 1. होम पेज (स्टोरीज के साथ) ---
  const renderHome = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity 
            key={i} 
            onPress={() => {
              setSelectedStory({ name: `User_${i}`, img: `https://picsum.photos/seed/${i+50}/500/800` });
              setStoryVisible(true);
            }}
            style={styles.storyCircle}>
            <View style={styles.storyBorder}><Image source={{ uri: `https://i.pravatar.cc/150?u=${i+10}` }} style={styles.storyImg} /></View>
            <Text style={styles.storyText}>User_{i}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.post}>
        <View style={styles.postHeader}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?u=9' }} style={styles.postUserImg} />
            <Text style={{fontWeight:'bold'}}>innovator_king</Text>
          </View>
          <Feather name="more-horizontal" size={20} />
        </View>
        <TouchableOpacity activeOpacity={1} onPress={handleDoubleTap}>
          <Image source={{ uri: 'https://picsum.photos/seed/post1/500/500' }} style={styles.postImage} />
          <Animated.View style={[styles.overlayHeart, { transform: [{ scale: animatedValue }] }]}><Ionicons name="heart" size={100} color="white" /></Animated.View>
        </TouchableOpacity>
        <View style={styles.postActions}>
          <TouchableOpacity onPress={()=>setLiked(!liked)}><Ionicons name={liked?"heart":"heart-outline"} size={28} color={liked?"red":"black"} /></TouchableOpacity>
          <Feather name="message-circle" size={26} style={{marginLeft:15}} /><Feather name="send" size={26} style={{marginLeft:15}} />
        </View>
        <View style={{paddingHorizontal:15, paddingBottom:15}}>
          <Text style={{fontWeight:'bold'}}>{liked ? '1,235 likes' : '1,234 likes'}</Text>
          <Text><Text style={{fontWeight:'bold'}}>innovator_king</Text> मेरा नया ऐप इंस्टाग्राम से बेहतर है! 🔥</Text>
        </View>
      </View>
    </ScrollView>
  );

  // --- 2. सर्च पेज ---
  const renderSearch = () => (
    <View style={{flex:1}}>
      <View style={styles.searchBar}><Feather name="search" size={20} color="gray" /><TextInput placeholder="Search" style={{marginLeft:10, flex:1}} /></View>
      <ScrollView><View style={styles.gridContainer}>
        {[1,2,3,4,5,6,7,8,9,10,11,12].map(i=>(<Image key={i} source={{uri:`https://picsum.photos/seed/${i+20}/200/200`}} style={styles.gridImage} />))}
      </View></ScrollView>
    </View>
  );

  // --- 3. प्रोफाइल पेज ---
  const renderProfile = () => (
    <ScrollView style={{flex:1}}>
      <View style={styles.profileTop}><Text style={{fontWeight:'bold', fontSize:18}}>innovator_king ▾</Text><Feather name="menu" size={24} /></View>
      <View style={styles.profileInfo}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?u=9' }} style={styles.largeProfileImg} />
        <View style={styles.statBox}><Text style={styles.statNum}>12</Text><Text>Posts</Text></View>
        <View style={styles.statBox}><Text style={styles.statNum}>1.5k</Text><Text>Followers</Text></View>
        <View style={styles.statBox}><Text style={styles.statNum}>200</Text><Text>Following</Text></View>
      </View>
      <View style={{padding:15}}><Text style={{fontWeight:'bold'}}>Innovator King</Text><Text>Entrepreneur | Developer 🚀</Text></View>
      <TouchableOpacity style={styles.editBtn} onPress={()=>setFollowing(!following)}><Text style={{fontWeight:'bold'}}>{following?'Following':'Follow'}</Text></TouchableOpacity>
      
      {/* हाइलाइट्स */}
      <ScrollView horizontal style={{marginVertical:10, paddingLeft:15}} showsHorizontalScrollIndicator={false}>
        {['Travel', 'Food', 'Work'].map((item, i)=>(<View key={i} style={{alignItems:'center', marginRight:15}}><View style={styles.highlightCircle} /><Text style={{fontSize:10, marginTop:5}}>{item}</Text></View>))}
      </ScrollView>

      <View style={styles.gridContainer}>
        {[1,2,3,4,5,6].map(i=>(<Image key={i} source={{uri:`https://picsum.photos/seed/${i+100}/200/200`}} style={styles.gridImage} />))}
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {activeTab === 'home' && (
        <View style={styles.header}><Text style={styles.logo}>NEXT-GEN</Text><View style={{flexDirection:'row'}}><Feather name="plus-square" size={24} style={styles.icon} /><Feather name="heart" size={24} style={styles.icon} /><Feather name="send" size={24} style={styles.icon} /></View></View>
      )}
      
      <View style={{flex:1}}>
        {activeTab === 'home' ? renderHome() : activeTab === 'search' ? renderSearch() : renderProfile()}
      </View>

      {/* बॉटम टैब */}
      <View style={styles.bottomTab}>
        <TouchableOpacity onPress={()=>setActiveTab('home')}><Ionicons name={activeTab==='home'?"home":"home-outline"} size={28} /></TouchableOpacity>
        <TouchableOpacity onPress={()=>setActiveTab('search')}><Ionicons name={activeTab==='search'?"search":"search-outline"} size={28} /></TouchableOpacity>
        <TouchableOpacity><FontAwesome5 name="video" size={24} color="gray" /></TouchableOpacity>
        <TouchableOpacity onPress={()=>setActiveTab('profile')}><View style={[styles.profileMini, {borderWidth: activeTab==='profile'?1:0}]} /></TouchableOpacity>
      </View>

      {/* स्टोरी फुल स्क्रीन मॉडल */}
      <Modal visible={storyVisible} transparent={false} animationType="slide">
        <View style={styles.fullStory}>
          <Image source={{ uri: selectedStory?.img }} style={styles.fullStoryImg} />
          <View style={styles.storyHeader}>
            <Text style={{color:'white', fontWeight:'bold'}}>{selectedStory?.name}</Text>
            <TouchableOpacity onPress={()=>setStoryVisible(false)}><Ionicons name="close" size={35} color="white" /></TouchableOpacity>
          </View>
          <View style={styles.storyFooter}><TextInput placeholder="Reply..." placeholderTextColor="white" style={styles.storyInput} /><Feather name="send" size={24} color="white" /></View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center', height: 50 },
  logo: { fontSize: 24, fontWeight: 'bold' },
  icon: { marginLeft: 15 },
  storiesContainer: { paddingVertical: 10, borderBottomWidth: 0.2, borderBottomColor: '#dbdbdb' },
  storyCircle: { alignItems: 'center', marginHorizontal: 8 },
  storyBorder: { width: 68, height: 68, borderRadius: 34, borderWidth: 2, borderColor: '#ff8501', padding: 2 },
  storyImg: { width: 60, height: 60, borderRadius: 30 },
  storyText: { fontSize: 11, marginTop: 4 },
  post: { marginTop: 10 },
  postHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 },
  postUserImg: { width: 35, height: 35, borderRadius: 17.5, marginRight: 10 },
  postImage: { width: width, height: 400 },
  overlayHeart: { position: 'absolute', top: 150, left: width/2 - 50, zIndex:10 },
  postActions: { flexDirection: 'row', padding: 12 },
  bottomTab: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#dbdbdb' },
  profileMini: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#ccc' },
  searchBar: { flexDirection: 'row', backgroundColor: '#efefef', margin: 15, padding: 10, borderRadius: 10, alignItems: 'center' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  gridImage: { width: width/3 - 2, height: width/3 - 2, margin: 1 },
  profileTop: { flexDirection: 'row', justifyContent: 'space-between', padding: 15 },
  profileInfo: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 15 },
  largeProfileImg: { width: 80, height: 80, borderRadius: 40 },
  statBox: { alignItems: 'center' },
  statNum: { fontSize: 18, fontWeight: 'bold' },
  editBtn: { backgroundColor: '#efefef', marginHorizontal:15, padding: 8, borderRadius: 5, alignItems: 'center' },
  highlightCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#efefef', borderWidth: 1, borderColor: '#dbdbdb' },
  fullStory: { flex: 1, backgroundColor: 'black' },
  fullStoryImg: { width: '100%', height: '80%', marginTop: 60 },
  storyHeader: { position: 'absolute', top: 40, width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  storyFooter: { position: 'absolute', bottom: 30, width: '100%', flexDirection: 'row', padding: 20, alignItems: 'center' },
  storyInput: { flex: 1, borderWidth: 1, borderColor: 'white', borderRadius: 20, paddingHorizontal: 15, color: 'white', marginRight: 10, height: 40 }
});
