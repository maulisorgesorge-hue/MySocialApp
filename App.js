import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function App() {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  
  // लाइक एनीमेशन के लिए
  const lastTap = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // डबल टैप लॉजिक
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
      setLiked(true);
      animateHeart();
    } else {
      lastTap.current = now;
