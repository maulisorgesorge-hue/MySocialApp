import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // यहाँ आपका Render वाला लिंक आएगा
      const response = await fetch('https://social-app-server-32un.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.status === 'success') {
        Alert.alert("बधाई हो!", "आप लॉगिन हो गए ✅");
      } else {
        Alert.alert("गलती", "ईमेल या पासवर्ड गलत है");
      }
    } catch (error) {
      Alert.alert("एरर", "सर्वर चालू नहीं है भाई!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Social App</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{color: 'white'}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: '#0095f6', padding: 15, alignItems: 'center', borderRadius: 5 }
});
    
