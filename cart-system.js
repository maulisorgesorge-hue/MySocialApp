import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = () => {
  // डमी डेटा: जो बाद में डेटाबेस से आएगा
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Premium T-Shirt', price: 999, quantity: 1, img: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Vibe Headphones', price: 2499, quantity: 1, img: 'https://via.placeholder.com/100' },
  ]);

  const updateQuantity = (id, type) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = type === 'add' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subTotal = cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart 🛒</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.img }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
              
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 'sub')}>
                  <Ionicons name="remove-circle-outline" size={28} color="#555" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 'add')}>
                  <Ionicons name="add-circle-outline" size={28} color="#FF0000" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeBtn}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty!</Text>}
      />

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalPrice}>₹{subTotal}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Checkout Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  cartItem: { flexDirection: 'row', padding: 15, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
  itemImage: { width: 80, height: 80, borderRadius: 10 },
  itemDetails: { flex: 1, marginLeft: 15 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemPrice: { fontSize: 14, color: '#FF0000', marginVertical: 5 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  quantityText: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' },
  removeBtn: { padding: 5 },
  footer: { padding: 20, backgroundColor: '#f9f9f9', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalLabel: { fontSize: 18, color: '#333' },
  totalPrice: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  checkoutBtn: { backgroundColor: '#FF0000', padding: 15, borderRadius: 10, alignItems: 'center' },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' }
});

export default CartScreen;
          
