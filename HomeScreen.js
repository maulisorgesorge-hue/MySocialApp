import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'; // लाइब्रेरी इम्पोर्ट

export default function HomeScreen() {
  const [userStory, setUserStory] = useState(null);

  // स्टोरी अपलोड करने का फंक्शन
  const uploadStory = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert("गैलरी की परमिशन चाहिए स्टोरी डालने के लिए!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
      videoMaxDuration: 60, // 1 मिनट लिमिट
    });

    if (!result.canceled) {
      setUserStory(result.assets[0].uri);
      alert("आपकी 1 मिनट की स्टोरी अपलोड हो गई!");
    }
  };

  return (
    <View style={styles.container}>

      {/* 🔍 Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>SocialStream</Text>
        <Ionicons name="search" size={24} color="black" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 📸 Stories Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyContainer}>

          {/* 👉 Your Story Button */}
          <TouchableOpacity style={styles.storyBox} onPress={uploadStory}>
            <View style={styles.addStoryWrapper}>
              <Image
                source={{ uri: userStory || "https://i.pravatar.cc/150?img=1" }}
                style={styles.storyImage}
              />
              <View style={styles.plusIcon}>
                <Ionicons name="add" size={16} color="#fff" />
              </View>
            </View>
            <Text style={styles.storyText}>Your Story</Text>
          </TouchableOpacity>

          {/* 👉 Other Users */}
          {[2,3,4,5,6].map((i) => (
            <View key={i} style={styles.storyBox}>
              <View style={styles.storyWrapper}>
                <Image
                  source={{ uri: `https://i.pravatar.cc/150?img=${i}` }}
                  style={styles.storyImage}
                />
              </View>
              <Text style={styles.storyText}>User {i}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 🎬 Video Section */}
        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>20/30 min videos</Text>

          <TouchableOpacity style={styles.videoCard}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f" }}
              style={styles.videoImage}
            />
            <View style={styles.playIcon}>
              <Ionicons name="play" size={30} color="#fff" />
            </View>
          </TouchableOpacity>

          <Text style={styles.videoTitle}>New Tech Review - 25:00 min</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 },
  logo: { fontSize: 22, fontWeight: "bold", color: '#FF0000' },
  storyContainer: { paddingHorizontal: 10, marginBottom: 15 },
  storyBox: { alignItems: "center", marginRight: 12 },
  storyWrapper: { borderWidth: 2, borderColor: "red", borderRadius: 50, padding: 2 },
  addStoryWrapper: { borderWidth: 2, borderColor: "gray", borderRadius: 50, padding: 2, position: 'relative' },
  storyImage: { width: 60, height: 60, borderRadius: 30 },
  plusIcon: { position: "absolute", bottom: 0, right: 0, backgroundColor: "#0095f6", borderRadius: 10, padding: 2, borderWidth: 2, borderColor: '#fff' },
  storyText: { fontSize: 12, marginTop: 5 },
  videoSection: { padding: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  videoCard: { borderRadius: 15, overflow: "hidden", position: 'relative' },
  videoImage: { width: "100%", height: 180, borderRadius: 15 },
  playIcon: { position: "absolute", top: "40%", left: "45%", backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 30, padding: 10 },
  videoTitle: { marginTop: 8, fontSize: 14 }
});
