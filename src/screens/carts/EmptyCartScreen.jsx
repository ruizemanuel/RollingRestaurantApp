import React from 'react';
import { AntDesign } from 'react-native-vector-icons';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const EmptyCartScreen = () => {
  const { navigate } =  useNavigation();

  const handleHome = () => {
    navigate('HomeScreen')
  };

  return (
    <View style={styles.container}>
      <AntDesign name="shoppingcart" size={75} color="#ff6347" />
      <Text style={styles.warnText}>Oops!</Text>
      <Text style={styles.emptyCartText}>Tu carrito está vacío</Text>
      <TouchableOpacity onPress={handleHome} style={styles.homeButton}>
        <Text style={styles.buttonText}>Ir al inicio</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  warnText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});