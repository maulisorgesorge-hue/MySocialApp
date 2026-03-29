import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const videos = [
  { id: "1", url: "https://www.w3schools.com/html/mov_bbb.mp4", user: "User 1", likes: 120, comments: 30 },
  { id: "2", url: "https://www.w3schools.com/html/movie.mp4", user: "User 2", likes: 90, comments: 12 }
];

export default function ReelsScreen() {
  // यह ट्रैक करेगा कि अभी कौन सा रील नंबर (index) सामने है
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // जब वीडियो स्वाइप होगा, तो यह फंक्शन बताएगा कि कौन सा वीडियो दिख रहा है
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveVideoIndex(viewableItems[0].index);
    }
  }).current;

  // यह सेटिंग पक्का करती है कि जब कम से कम 50% वीडियो स्क्रीन पर आ जाए, तभी उसे 'दिख रहा है' माना जाए
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  const renderItem = ({ item, index }) => (
    <View style={styles.container}>
      
      {/* 🎥 Video */}
      <Video
        source={{ uri: item.url }}
        style={styles.video}
        resizeMode="cover"
        // 👈 जादू यहाँ है: अगर index मैच करेगा तभी चलेगा, वरना आवाज़ और वीडियो दोनों रुक जाएंगे
        shouldPlay={activeVideoIndex === index} 
        isLooping
        isMuted={false}
      />

      {/* ❤️ Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconBox}>
          <Ionicons name="heart" size={35} color="#fff" />
          <Text style={styles.text}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox}>
          <Ionicons name="chatbubble-ellipses" size={32} color="#fff" />
          <Text style={styles.text}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox}>
          <Ionicons name="share-social" size={32} color="#fff" />
          <Text style={styles.text}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* 👤 Username */}
      <View style={styles.bottomText}>
        <Text style={styles.username}>@{item.user}</Text>
        <Text style={styles.caption}>Awesome short video 🔥 #viral</Text>
      </View>

    </View>
  );

  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled // स्वाइप करने पर एक-एक वीडियो पर रुकेगा
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      showsVerticalScrollIndicator={false}
      // रील को स्मूथ बनाने के लिए ये सेटिंग्स ज़रूरी हैं
      snapToInterval={height}
      snapToAlignment="start"
      decelerationRate="fast"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: "#000"
  },
  video: {
    ...StyleSheet.absoluteFillObject // पूरा स्क्रीन कवर करेगा
  },
  actions: {
    position: "absolute",
    right: 15,
    bottom: 120,
    alignItems: "center"
  },
  iconBox: {
    marginBottom: 25,
    alignItems: "center"
  },
  text: {
    color: "#fff",
    marginTop: 5,
    fontWeight: 'bold'
  },
  bottomText: {
    position: "absolute",
    bottom: 40,
    left: 15
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  caption: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14
  }
});
          
