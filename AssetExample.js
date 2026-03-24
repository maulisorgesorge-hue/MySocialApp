import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default function AssetExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Instagram Logo Text */}
      <Text style={styles.logoText}>Instagram</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Phone number, username or email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.footer}>
        <Text style={{color: '#999'}}>Don't have an account? </Text>
        <Text style={{color: '#0095f6', fontWeight: 'bold'}}>Sign up.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoText: {
    fontSize: 45,
    fontFamily: 'serif', // Instagram style font
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0095f6',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotContainer: {
    marginTop: 20,
  },
  forgotText: {
    color: '#00376b',
    fontSize: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    width: '110%',
    paddingTop: 20,
    justifyContent: 'center',
  },
});
