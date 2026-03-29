import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'; // लाइब्रेरी का उपयोग

export default function HomeScreen() {
  const [userStory, setUserStory] = useState(null);

  // फोटो चुनने का फंक्शन
  const pickImage = async () => {
    // गैलरी की अनुमति मांगें
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('अनुमति चाहिए', 'ऐप को आपकी गैलरी एक्सेस करने की अनुमति दें।');
      return;
    }

    // इमेज पिकर खोलें
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserStory(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>SocialStream</Text>

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

      {/* फीड सेक्शन */}
      <View style={styles.feedBox}>
        <Ionicons name="images-outline" size={60} color="#ddd" />
        <Text style={styles.feedText}>अभी कोई पोस्ट नहीं है।</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 50 },
  header: { fontSize: 26, fontWeight: "bold", color: "#E91E63", marginLeft: 20, marginBottom: 20 },
  storyContainer: { paddingLeft: 20, marginBottom: 30 },
  storyCircle: { alignItems: "center", width: 80 },
  addIcon: { width: 70, height: 70, borderRadius: 35, backgroundColor: "#E91E63", justifyContent: "center", alignItems: "center", borderWidth: 3, borderColor: "#fff" },
  storyImage: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: "#E91E63" },
  storyLabel: { marginTop: 5, fontSize: 12, color: "#333" },
  feedBox: { flex: 1, height: 400, justifyContent: "center", alignItems: "center" },
  feedText: { marginTop: 10, color: "#999", fontSize: 16 }
});
      
