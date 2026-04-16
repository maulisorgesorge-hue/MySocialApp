import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReelsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reels Video Section 🎬</Text>
      <Text style={styles.subtext}>यहाँ आपकी शॉर्ट वीडियो दिखेंगी</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  subtext: { color: '#888', marginTop: 10 }
});
