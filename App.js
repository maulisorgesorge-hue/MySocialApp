import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    // यहाँ हम सर्वर को कॉल करेंगे, सर्वर का कोड यहाँ नहीं लिखेंगे!
    alert("लॉगिन की कोशिश कर रहे हैं...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Social App</Text>
      <TextInput 
        placeholder="Email" 
        style={styles.input} 
        onChangeText={setEmail}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '80%', borderBottomWidth: 1, marginBottom: 20, padding: 8 }
});
