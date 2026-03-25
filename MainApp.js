import React, { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  FlatList, TextInput, ScrollView, SafeAreaView, Dimensions
} from "react-native";

// ध्यान दें: अगर आप असली फोन पर टेस्ट कर रहे हैं, तो localhost की जगह अपने PC का IP डालें
const API = "http://localhost:5000/api"; 
const { width } = Dimensions.get("window");

export default function App() {
  const [screen, setScreen] = useState("home");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram Clone</Text>
      </View>

      <View style={{ flex: 1 }}>
        {screen === "home" && <Home />}
        {screen === "upload" && <Upload />}
        {screen === "chat" && <Chat />}
        {screen === "profile" && <Profile />}
      </View>

      {/* Modern Bottom Navigation */}
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => setScreen("home")}><Text style={styles.navIcon}>🏠</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("explore")}><Text style={styles.navIcon}>🔍</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("upload")}><Text style={styles.navIcon}>➕</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("chat")}><Text style={styles.navIcon}>💬</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen("profile")}><Text style={styles.navIcon}>👤</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- HOME FEED ---
const Home = () => {
  const [posts, setPosts] = useState([]);

  const getFeed = async () => {
    try {
      const res = await fetch(API + "/explore/posts"); // हमारे नए Explore API का उपयोग
      const data = await res.json();
      setPosts(data.posts);
    } catch (e) { console.log(e); }
  };

  const handleLike = async (id) => {
    await fetch(API + "/reels/like/" + id, { // बैकएंड का Like Route
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "user1" })
    });
    getFeed(); // अपडेटेड लाइक्स दिखाने के लिए रिफ्रेश
  };

  useEffect(() => { getFeed(); }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.postCard}>
          <Text style={styles.postUser}>👤 {item.userId || 'Anonymous'}</Text>
          <Image source={{ uri: "http://localhost:5000/uploads/" + item.image }} style={styles.postImg} />
          
          <View style={styles.actionRow}>
            <TouchableOpacity onPress={() => handleLike(item._id)}>
              <Text style={styles.actionText}>❤️ {item.likes?.length || 0}</Text>
            </TouchableOpacity>
            <TouchableOpacity><Text style={styles.actionText}>💬 {item.comments?.length || 0}</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.actionText}>🔗 Share</Text></TouchableOpacity>
          </View>
          
          <Text style={styles.caption}><Text style={{fontWeight: 'bold'}}>{item.userId}</Text> {item.caption}</Text>
        </View>
      )}
    />
  );
};

// --- CHAT SYSTEM (REAL-TIME UI) ---
const Chat = () => {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const loadChat = async () => {
    const res = await fetch(API + "/dm/chat/user1/user2");
    const data = await res.json();
    setChat(data.messages || []);
  };

  const sendMsg = async () => {
    if(!msg) return;
    await fetch(API + "/dm/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId: "user1", receiverId: "user2", text: msg })
    });
    setMsg("");
    loadChat();
  };

  useEffect(() => { loadChat(); }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={chat}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.senderId === "user1" ? styles.myMsg : styles.otherMsg]}>
            <Text style={{color: item.senderId === "user1" ? '#fff' : '#000'}}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputArea}>
        <TextInput value={msg} onChangeText={setMsg} placeholder="Message..." style={styles.chatInput} />
        <TouchableOpacity onPress={sendMsg}><Text style={styles.sendBtn}>Send</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { height: 50, justifyContent: 'center', paddingHorizontal: 15, borderBottomWidth: 0.5, borderColor: '#dbdbdb' },
  logo: { fontSize: 24, fontWeight: 'bold', fontFamily: 'Cochin' },
  nav: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 12, borderTopWidth: 0.5, borderColor: '#dbdbdb' },
  navIcon: { fontSize: 24 },
  postCard: { marginBottom: 15 },
  postUser: { padding: 10, fontWeight: '600' },
  postImg: { width: width, height: width, backgroundColor: '#efefef' },
  actionRow: { flexDirection: 'row', padding: 10 },
  actionText: { marginRight: 15, fontSize: 16 },
  caption: { paddingHorizontal: 10, marginBottom: 10 },
  inputArea: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  chatInput: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 15, height: 40 },
  sendBtn: { marginLeft: 10, color: '#0095f6', fontWeight: 'bold' },
  bubble: { padding: 10, borderRadius: 15, marginVertical: 5, maxWidth: '80%' },
  myMsg: { alignSelf: 'flex-end', backgroundColor: '#0095f6' },
  otherMsg: { alignSelf: 'flex-start', backgroundColor: '#efefef' }
});
