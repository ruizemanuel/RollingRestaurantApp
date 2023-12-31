import React, { useState } from 'react';
import { useContext } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { AntDesign } from "react-native-vector-icons";
import { AuthContext } from '../../contexts/AuthContext';
import { CustomCardProducts } from '../../components/products/CustomCardProducts';
import { ProductContext } from '../../contexts/ProductContext';
import { PedidoContext } from '../../contexts/PedidoContext';
import { globalStyles } from '../../themes/globalThemes';
import { useEffect } from 'react';
import { CustomItemSearch } from '../../components/products/CustomItemSearch';
import { CartContext } from '../../contexts/CartContext';

export const ProfileScreen = ({ navigation }) => {
  const { logout, state } = useContext(AuthContext);
  const { getPedidos } = useContext(PedidoContext);
  const pedidosData = useContext(PedidoContext).state;
  const message = useContext(CartContext).state;
  const [refreshing, setRefreshing] = useState(false);
  const profileImageUrl = 'https://i.pravatar.cc/150?img=57';

  const onRefresh = () => {
    setRefreshing(true);
    getPedidos().then(() => {
      setRefreshing(false)
    })
  };

  useEffect(()=> {
    if(message.msg === "Pedido creado con exito"){
      getPedidos()
    }
  }, [message.msg])

  const checkFavoriteStatus = () => {
    const favoritos = typeof state.user.favorites === 'string' ? JSON.parse(state.user.favorites) : state.user.favorites;
    const existFavorite = favoritos?.find((item) => item.email === state.user.email);
    if (existFavorite) {
      return existFavorite.favorites;
    }
    return []

  };

  const [favs, setFavs] = useState(state.user && state.user.favorites?.length !== 0 ? checkFavoriteStatus() : []);

  useEffect(() => {
    if (pedidosData.pedidos?.length !== 0) {
      getPedidos();
    }
  }, [])

  useEffect(() => {
    if (state.user && state.user.favorites?.length !== 0) {
      setFavs(checkFavoriteStatus());
    }
  }, [state.user.favorites])

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
      {pedidosData.pedidos?.filter((pedido) => pedido.email === state.user.email).length === 0 && favs.length == 0 &&
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#888' }}>Aquí se guardan tus pedidos y tus favoritos</Text>
        </View>
      }
      {
        favs.length !== 0 &&
        <View style={{ 
          flex: pedidosData.pedidos?.filter((pedido) => pedido.email === state.user.email).length !== 0 ? 2 : 0.45, 
          top: 80 }}>
          <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold', margin: 5 }}>Mis Favoritos</Text>
          <FlatList
            data={favs}
            renderItem={({ item }) => <CustomCardProducts itemData={item} />}
            keyExtractor={item => item._id}
            horizontal={true} />
        </View>
      }
      {
        pedidosData.pedidos?.filter((pedido) => pedido.email === state.user.email).length !== 0 &&
        <View style={{ flex: 2.5, top: 100 }}>
          <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold', margin: 5 }}>Mis pedidos</Text>
          <FlatList
            data={pedidosData.pedidos?.filter((pedido) => pedido.email === state.user.email)}
            renderItem={({ item }) => <CustomItemSearch item={item} />}
            keyExtractor={item => item._id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        </View>
      }
    </View>
  );
};


const styles = StyleSheet.create({

  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
    top: 0,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
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