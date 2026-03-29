import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // डमी डेटा (जो बाद में आपके सर्वर से आएगा)
  const DUMMY_RESULTS = [
    { id: '1', name: 'Rahul Tech', type: 'User', img: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Amazing Sunset', type: 'Reel', img: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Vibe Music', type: 'User', img: 'https://via.placeholder.com/50' },
  ];

  return (
    <View style={styles.container}>
      {/* सर्च बार (यूट्यूब स्टाइल) */}
      <View style={styles.searchSection}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search creators, reels, or posts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* रिजल्ट्स लिस्ट */}
      <FlatList
        data={DUMMY_RESULTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultItem}>
            <Image source={{ uri: item.img }} style={styles.avatar} />
            <View>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.typeText}>{item.type}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Type something to search...</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    margin: 15,
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, height: 45, fontSize: 16, color: '#000' },
  resultItem: { flexDirection: 'row', padding: 15, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  nameText: { fontSize: 16, fontWeight: 'bold' },
  typeText: { fontSize: 12, color: 'gray' },
  emptyText: { textAlign: 'center', marginTop: 50, color: 'gray' }
});

export default SearchScreen;
                                      
