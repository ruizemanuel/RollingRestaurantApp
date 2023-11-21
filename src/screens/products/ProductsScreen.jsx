import React, { useContext, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../themes/globalThemes";
import { MaterialIcons } from "react-native-vector-icons";
import { Pressable } from "react-native";
import { CustomQuantity } from "../../components/CustomQuantity";
import { useQuantity } from "../../hooks/useQuantity";
import { CartContext } from "../../contexts/CartContext";

export const ProductsScreen = ({ route }) => {

  const { itemData } = route.params;
  const [talle, setTalle] = useState(0);
  const  { quantity, sumQuantity, restQuantity} = useQuantity();
  const { addCart, state } = useContext(CartContext);


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

      addCart(data);
  }


  return (
    <View style={globalStyles.container}>
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
            borderRadius: 10
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
          {itemData.productName}{" "}
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
              alignSelf:  'center'
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
