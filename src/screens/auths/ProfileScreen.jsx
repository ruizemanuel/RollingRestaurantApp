import React, { useState } from 'react';
import { useContext } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from "react-native-vector-icons";
import { AuthContext } from '../../contexts/AuthContext';
import { CustomCardProducts } from '../../components/products/CustomCardProducts';
import { ProductContext } from '../../contexts/ProductContext';
import { globalStyles } from '../../themes/globalThemes';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileScreen = () => {
  const { logout, state } = useContext(AuthContext);
  const productData = useContext(ProductContext).state;
  const profileImageUrl = 'https://i.pravatar.cc/150?img=57';

  const checkFavoriteStatus = () => {
    const favoritos = typeof state.user.favorites === 'string' ? JSON.parse(state.user.favorites) : state.user.favorites;
    const { favorites } = favoritos.find((item) => item.email === state.user.email);
    console.log(favorites);
    return favorites;
  };

  const [favs, setFavs] = useState(state.user.favorites?.length !== 0 ? checkFavoriteStatus() : []);

  useEffect(() => {
   if(state.user.favorites?.length !== 0){
    setFavs(checkFavoriteStatus());
   } 
  },[state.user.favorites])

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
        <Text style={styles.userName}>{state.user.name}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <AntDesign name='logout' size={24} color={'#ff6347'} />
        </TouchableOpacity>
      </View>
      {
        favs.length !== 0 && <View style={{ flex: 2.5 }}>
          <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold', margin: 5 }}>Mis Favoritos</Text>
          <FlatList
            data={favs}
            renderItem={({ item }) => <CustomCardProducts itemData={item} />}
            keyExtractor={item => item._id}
            horizontal={true} />
        </View>
      }
      <View style={{ flex: 2.5 }}>
        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold', margin: 5 }}>Mis pedidos</Text>
        <FlatList
          data={productData.products}
          renderItem={({ item }) => <CustomCardProducts itemData={item} />}
          keyExtractor={item => item._id}
          horizontal={true} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({

  container: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: -15,
    marginTop: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  logoutButton: {
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