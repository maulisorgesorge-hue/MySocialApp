import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "./firebase-config"; // अपनी फाइल का पाथ चेक कर लें

export default function HomeScreen() {
  const [userStory, setUserStory] = useState(null);
  const [posts, setPosts] = useState([]);

  // 1. रीयल-टाइम पोस्ट्स मंगाना (No Refresh Needed)
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  // 2. पोस्ट रिपोर्ट करने का फंक्शन (Safety Feature)
  const handleReport = (postId) => {
    Alert.alert(
      "Report Post",
      "क्या आप इस पोस्ट को रिपोर्ट करना चाहते हैं?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Report", 
          onPress: async () => {
            await addDoc(collection(db, "reports"), {
              postId: postId,
              reportedBy: auth.currentUser?.uid || "anonymous",
              timestamp: serverTimestamp()
            });
            Alert.alert("Success", "रिपोर्ट दर्ज कर ली गई है।");
          } 
        }
      ]
    );
  };

  // फोटो चुनने का फंक्शन (Story के लिए)
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'गैलरी एक्सेस की अनुमति दें।');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5, // साइज कम रखने के लिए quality कम की है
    });

    if (!result.canceled) {
      setUserStory(result.assets[0].uri);
      // यहाँ आप इस इमेज को Firebase Storage में अपलोड करने का कोड भी डाल सकते हैं
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SocialStream</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* स्टोरी सेक्शन */}
        <View style={styles.storyContainer}>
          <TouchableOpacity style={styles.storyCircle} onPress={pickImage}>
            {userStory ? (
              <Image source={{ uri: userStory }} style={styles.storyImage} />
            ) : (
              <View style={styles.addIcon}>
                <Ionicons name="add" size={30} color="white" />
              </View>
            )}
            <Text style={styles.storyLabel}>Your Story</Text>
          </TouchableOpacity>
        </View>

        {/* फीड सेक्शन (Real-time) */}
        {posts.length > 0 ? (
          posts.map((item) => (
            <View key={item.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Text style={styles.postUser}>{item.username || "User"}</Text>
                <TouchableOpacity onPress={() => handleReport(item.id)}>
                  <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
              <View style={styles.postFooter}>
                <Ionicons name="heart-outline" size={24} color="black" />
                <Ionicons name="chatbubble-outline" size={22} color="black" style={{marginLeft: 15}} />
              </View>
              <Text style={styles.caption}>{item.caption}</Text>
            </View>
          ))
        ) : (
          <View style={styles.feedBox}>
            <Ionicons name="images-outline" size={60} color="#ddd" />
            <Text style={styles.feedText}>अभी कोई पोस्ट नहीं है।</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50 },
  header: { fontSize: 26, fontWeight: "bold", color: "#E91E63", marginLeft: 20, marginBottom: 15 },
  storyContainer: { paddingLeft: 20, marginBottom: 10, borderBottomWidth: 0.5, borderBottomColor: '#eee', paddingBottom: 10 },
  storyCircle: { alignItems: "center", width: 80 },
  addIcon: { width: 66, height: 66, borderRadius: 33, backgroundColor: "#E91E63", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "#fff" },
  storyImage: { width: 66, height: 66, borderRadius: 33, borderWidth: 2, borderColor: "#E91E63" },
  storyLabel: { marginTop: 5, fontSize: 11, color: "#333" },
  
  // फीड स्टाइल्स
  postCard: { marginBottom: 20, backgroundColor: '#fff' },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' },
  postUser: { fontWeight: 'bold', fontSize: 15 },
  postImage: { width: '100%', height: 350 },
  postFooter: { flexDirection: 'row', padding: 10 },
  caption: { paddingHorizontal: 10, paddingBottom: 10, color: '#333' },
  
  feedBox: { height: 300, justifyContent: "center", alignItems: "center" },
  feedText: { marginTop: 10, color: "#999", fontSize: 16 }
});
    
