import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';

const ProfileScreen = () => {
  // स्टेट्स (Data को मैनेज करने के लिए)
  const [displayName, setDisplayName] = useState('Vibe User');
  const [bio, setBio] = useState('Creating vibes on SocialStream! 🚀');
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* प्रोफाइल हेडर */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} 
          style={styles.avatar} 
        />
        <Text style={styles.username}>{displayName}</Text>
      </View>

      {/* एडिट फॉर्म */}
      <View style={styles.form}>
        <Text style={styles.label}>Display Name</Text>
        <TextInput 
          style={styles.input} 
          value={displayName} 
          onChangeText={setDisplayName} 
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput 
          style={[styles.input, { height: 80 }]} 
          value={bio} 
          multiline
          onChangeText={setBio} 
        />

        {/* प्राइवेसी टॉगल */}
        <View style={styles.switchRow}>
          <Text style={styles.label}>Private Account</Text>
          <Switch 
            value={isPrivate} 
            onValueChange={setIsPrivate} 
            trackColor={{ false: "#767577", true: "#FF0000" }}
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Profile ✅</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { alignItems: 'center', padding: 40, backgroundColor: '#fff' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10, borderWidth: 2, borderColor: '#FF0000' },
  username: { fontSize: 22, fontWeight: 'bold' },
  form: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5, color: '#333' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 20 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  saveButton: { backgroundColor: '#FF0000', padding: 15, borderRadius: 10, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default ProfileScreen;
        
