import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      {/* 🔍 Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>SocialStream</Text>
        <Ionicons name="search" size={24} color="black" />
      </View>

      {/* 📸 Stories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyContainer}>

        {/* 👉 Your Story */}
        <View style={styles.storyBox}>
          <View style={styles.addStoryWrapper}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=1" }}
              style={styles.storyImage}
            />
            <View style={styles.plusIcon}>
              <Ionicons name="add" size={16} color="#fff" />
            </View>
          </View>
          <Text style={styles.storyText}>Your Story</Text>
        </View>

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
            source={{
              uri: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f"
            }}
            style={styles.videoImage}
          />
          <View style={styles.playIcon}>
            <Ionicons name="play" size={30} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text style={styles.videoTitle}>
          New Tech Review - 25:00 min
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15
  },

  logo: {
    fontSize: 22,
    fontWeight: "bold"
  },

  storyContainer: {
    paddingHorizontal: 10
  },

  storyBox: {
    alignItems: "center",
    marginRight: 12
  },

  storyWrapper: {
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 50,
    padding: 2
  },

  addStoryWrapper: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 50,
    padding: 2
  },

  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30
  },

  plusIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0095f6",
    borderRadius: 10,
    padding: 2
  },

  storyText: {
    fontSize: 12,
    marginTop: 5
  },

  videoSection: {
    padding: 15
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },

  videoCard: {
    borderRadius: 15,
    overflow: "hidden"
  },

  videoImage: {
    width: "100%",
    height: 180,
    borderRadius: 15
  },

  playIcon: {
    position: "absolute",
    top: "40%",
    left: "45%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
    padding: 10
  },

  videoTitle: {
    marginTop: 8,
    fontSize: 14
  }
});
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// 1. सबसे ऊपर इसे इम्पोर्ट करें
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen() {

  // 2. स्टोरी अपलोड करने का फंक्शन
  const uploadStory = async () => {
    // गैलरी की परमिशन मांगना
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert("गैलरी की परमिशन चाहिए स्टोरी डालने के लिए!");
      return;
    }

    // गैलरी खोलना (सिर्फ वीडियो के लिए)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
      videoMaxDuration: 60, // 👈 यहाँ 60 सेकंड (1 मिनट) सेट है
    });

    if (!result.canceled) {
      console.log("Video URI:", result.assets[0].uri);
      alert("आपकी 1 मिनट की स्टोरी अपलोड हो गई!");
    }
  };

  return (
    <View style={styles.container}>
      {/* ... बाकी हेडर का कोड ... */}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storySection}>
        
        {/* 👉 'Your Story' बटन पर फंक्शन लगा दिया */}
        <TouchableOpacity style={styles.storyBox} onPress={uploadStory}>
          <View style={styles.myStoryCircle}>
            <Image source={{ uri: "https://i.pravatar.cc/150?img=12" }} style={styles.storyImg} />
            <View style={styles.plusIcon}>
              <Ionicons name="add" size={12} color="white" />
            </View>
          </View>
          <Text style={styles.storyText}>Your Story</Text>
        </TouchableOpacity>

        {/* ... दूसरों की स्टोरी ... */}
      </ScrollView>
      
      {/* ... बाकी फीड का कोड ... */}
    </View>
  );
}

// ... स्टाइलिंग पहले वाली ही रहेगी
    
