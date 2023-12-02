import React, { useState } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Pressable } from 'react-native';
import { AntDesign } from "react-native-vector-icons";
import { useQuantity } from '../hooks/useQuantity';

export const CustomQuantity = ( { quantity, sumQuantity, restQuantity }) => {

  return (

    <View style={{
        flexDirection: "row",
        borderColor: "#fff",
        borderRadius: 5
        }}
    >
        <Pressable 
            style={{ alignItems: "center" }}
            onPress={ restQuantity }
        >
            <AntDesign name="minussquare" size={25} color="#ff6347" />
        </Pressable>

        <View
        style={{
            alignItems: "center",
            minWidth: 50
        }}
        >
            <Text
                style={{
                color: "#000",
                fontSize: 19,
                fontWeight: "bold",
                }}
            >
                { quantity }
            </Text>
        </View>

        <Pressable
            style={{alignItems: "center"}}
            onPress={ sumQuantity }
        >
            <AntDesign name="plussquare" size={25} color="#ff6347" />
        </Pressable>
    </View>
    
  )
}
