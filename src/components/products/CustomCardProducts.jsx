import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { ProductsScreen } from '../../screens/products/ProductsScreen';
import { AntDesign } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

export const CustomCardProducts = ({itemData}) => {

    const { navigate } =  useNavigation();
    //const photo = `../../assets/photo/products/${itemData.photo}`;
    const [favorite, setFavorite] = useState(0);

    const onPresFavorite = (id) => {
      setFavorite(id);
    }

    return (
      <Pressable
        style={{
          marginHorizontal:5,
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
                width:'100%',
                height: 130,
                marginBottom:5,
                borderRadius: 10,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{
            paddingHorizontal:3,
            marginTop: 3,
          }}>
            <Text style={{ fontSize: 14, color: '#7e7e80',  }}>{ itemData.category}</Text>
            <Text style={{ fontSize: 16, color: '#000'}}>{ itemData.productName }</Text>
            <Text style={{ fontSize: 18, color: '#ff6347'}}>${ itemData.price }.00</Text>
          </View>

          <Pressable 
            onPress={() => onPresFavorite(itemData._id)}
          >
            <View style={{
              backgroundColor: '#ff6347',
              paddingHorizontal: 15,
              paddingVertical:10,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 20,
              position: 'absolute',
              bottom: -68,
              right: -11
            }}>
              <Text style={{ fontSize: 20}}>
                <AntDesign name={favorite == itemData._id ? 'heart' : 'hearto'} size={18} color='#fff' />
              </Text>
            </View>
          </Pressable>
        </View>
      
      </Pressable>
    )
}
