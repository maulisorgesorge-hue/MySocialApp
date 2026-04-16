import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.videoCard}>
        <Text style={styles.videoTitle}>Welcome to VibeTube 📺</Text>
        <Text style={styles.channelName}>आपका सर्वर अब लाइव है!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  videoCard: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#333' },
  videoTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  channelName: { color: '#aaa', fontSize: 14 }
});
