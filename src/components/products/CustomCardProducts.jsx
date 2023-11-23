import React, { useState } from 'react';
import { Image, Pressable, Text, View, ToastAndroid } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

export const CustomCardProducts = ({ itemData }) => {

  const { navigate } = useNavigation();
  const { state } = useContext(AuthContext);

  const checkFavoriteStatus = () => {
    const favoritos = JSON.parse(state.user.favorites);
    const {favorites} = favoritos.find((item) => item.email === state.user.email);
    if (favorites) {
      const isFavorite = favorites.some((fav) => fav.id === itemData._id);
      return isFavorite ? itemData._id : 0;
    }
    return 0;
    
  };

  const [favorite, setFavorite] = useState(checkFavoriteStatus());

  const onPressFavorite = async (id, item) => {
    const email = await AsyncStorage.getItem('email');
    let userFavorites = await AsyncStorage.getItem('userFavorites');

    if (!userFavorites) {
      userFavorites = [];
    } else {
      userFavorites = JSON.parse(userFavorites);
    }

    const userIndex = userFavorites.findIndex((user) => user.email === email);
    let favoriteIndex = -1;

    if (userIndex === -1) {
      userFavorites.push({
        email,
        favorites: [{ id, item }],
      });
      ToastAndroid.show("Se agregó el producto a tus favoritos", ToastAndroid.SHORT);
    } else {
      const userFavoritesArray = userFavorites[userIndex].favorites;
      favoriteIndex = userFavoritesArray.findIndex((fav) => fav.id === id);

      if (favoriteIndex === -1) {
        userFavoritesArray.push({ id, item });
        ToastAndroid.show("Se agregó el producto a tus favoritos", ToastAndroid.SHORT);
      } else {
        userFavoritesArray.splice(favoriteIndex, 1);
        ToastAndroid.show("Se eliminó el producto de tus favoritos", ToastAndroid.SHORT);
      }

      userFavorites[userIndex].favorites = userFavoritesArray;
    }

    await AsyncStorage.setItem('userFavorites', JSON.stringify(userFavorites));
    setFavorite(userIndex === -1 || favoriteIndex === -1 ? id : 0);
  };





  return (
    <Pressable
      style={{
        marginHorizontal: 5,
        backgroundColor: '#fff',
        // borderColor: 'rgba(255,255,255,0.1)',
        // borderWidth:2,
        borderRadius: 15
      }}
      onPress={() => navigate('ProductsScreen', {
        itemData,
      })}
    >

      <View style={{
        height: 200,
        width: 160,
        padding: 10,
      }}>
        <View>
          <Image
            source={{
              uri: itemData.urlImg
            }}
            style={{
              width: '100%',
              height: 130,
              marginBottom: 5,
              borderRadius: 10,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{
          paddingHorizontal: 3,
          marginTop: 3,
        }}>
          <Text style={{ fontSize: 14, color: '#7e7e80', }}>{itemData.category}</Text>
          <Text style={{ fontSize: 16, color: '#000' }}>{itemData.productName}</Text>
          <Text style={{ fontSize: 18, color: '#ff6347' }}>${itemData.price}.00</Text>
        </View>

        <Pressable
          onPress={() => onPressFavorite(itemData._id, itemData)}
        >
          <View style={{
            backgroundColor: '#ff6347',
            paddingHorizontal: 15,
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 20,
            position: 'absolute',
            bottom: -68,
            right: -11
          }}>
            <Text style={{ fontSize: 20 }}>
              <AntDesign name={favorite == itemData._id ? 'heart' : 'hearto'} size={18} color='#fff' />
            </Text>
          </View>
        </Pressable>
      </View>

    </Pressable>
  )
}
