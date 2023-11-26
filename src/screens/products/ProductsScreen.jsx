import React, { useContext, useState } from "react";
import { Image, ToastAndroid, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { globalStyles } from "../../themes/globalThemes";
import { Ionicons } from 'react-native-vector-icons';
import { Pressable } from "react-native";
import { CustomQuantity } from "../../components/CustomQuantity";
import { useQuantity } from "../../hooks/useQuantity";
import { CartContext } from "../../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";

export const ProductsScreen = ({ route }) => {

  const { itemData } = route.params;
  const [talle, setTalle] = useState(0);
  const { quantity, sumQuantity, restQuantity } = useQuantity();
  const { addCart, state } = useContext(CartContext);
  const navigation = useNavigation();


  const obtenerTalle = (dataTalle) => {
    if (dataTalle == talle) {
      return setTalle(0);
    }
    setTalle(dataTalle);
  };

  const addToCart = () => {
    const data = {
      product: itemData,
      qty: quantity
    }
    if (!quantity) {
      ToastAndroid.show('La cantidad no puede ser 0', ToastAndroid.SHORT);
      return;
    }
    const existElement = state.cart.find((item) => item.id == itemData._id);
    if (!existElement) {
      addCart(data);
      ToastAndroid.show('Pedido agregado al carrito', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Ya agregaste este item al carrito', ToastAndroid.SHORT);
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
            >
              <Ionicons name='arrow-back' size={28} color='#ff6347' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: itemData.urlImg }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      <View
        style={{
          flex: 2,
          marginVertical: 20,
          justifyContent: "center",
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 16, color: "#888" }}>
          {itemData.category}
        </Text>
        <Text style={{ fontSize: 19, color: "#000", fontWeight: "bold" }}>
          {itemData.productName}
        </Text>
        <Text style={{ fontSize: 22, color: "#ff6347", fontWeight: "bold" }}>
          ${itemData.price}
        </Text>
      </View>

      <View
        style={{
          marginVertical: 20,
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 15,
              color: "#888",
              marginBottom: 5,
            }}
          >
            Cantidad
          </Text>
        </View>

        <CustomQuantity
          quantity={quantity}
          sumQuantity={sumQuantity}
          restQuantity={restQuantity}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#ff6347",
              alignItems: "center",
              fontSize: "17",
              fontWeight: "600",
              color: "#fff",
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 5,
              alignSelf: 'center'
            }}
            onPress={addToCart}
          >
            <Text style={globalStyles.defaulTextBtn}>AGREGAR AL CARRITO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingBottom: 80,
  },

  head: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    top: 0,
    alignItems: 'flex-start'
  },

  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 5,
    zIndex: 999,
    alignSelf: 'center',
    marginTop: 10
  },
})