import React from 'react';
import { View, TextInput, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="gray" style={{marginRight: 10}} />
          <TextInput placeholder="Search users or IDs..." style={styles.input} />
        </View>
      </View>

      {/* 🎬 Explore Grid */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {[1,2,3,4,5,6,7,8,9,10,11,12].map((i) => (
            <View key={i} style={styles.gridItem}>
              <Image source={{ uri: `https://picsum.photos/400/600?random=${i}` }} style={styles.exploreImage} />
              {i % 3 === 0 && <Ionicons name="play" size={20} color="white" style={styles.playIcon} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  searchHeader: { paddingTop: 50, paddingHorizontal: 15, paddingBottom: 15 },
  searchBar: { backgroundColor: '#EFEFEF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderRadius: 10, height: 40 },
  input: { flex: 1, fontSize: 16 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: width / 3 - 1, height: 180, margin: 0.5, position: 'relative' },
  exploreImage: { width: '100%', height: '100%' },
  playIcon: { position: 'absolute', top: 5, right: 5 }
});
        
