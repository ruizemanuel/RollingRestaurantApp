import React, { useContext } from 'react';
import { Image, Pressable, Text, View, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProductContext } from '../contexts/ProductContext';

export const CustomCardCategories = ({itemData}) => {
    const { navigate } =  useNavigation();
    const { state } = useContext(ProductContext);
    const filteredProducts = state.products?.filter((product) => product.category == itemData.categoryName.toLowerCase());

    const onPressCategory = () => {
      if(filteredProducts.length !== 0){
        navigate('SearchScreen', {
          filteredProducts,
        })
      } else{
        ToastAndroid.show(`No hay productos en ${itemData.categoryName}`, ToastAndroid.SHORT);
      }
    }

    return (
      <Pressable
        style={{
          marginHorizontal:5,
          backgroundColor: '#fff',
          borderRadius: 15
        }}
        onPress={onPressCategory}
      >

        <View style={{
          height: 200,
          width: 160,
          padding: 10
        }}>
          <View>
            <Image
              source={
                itemData.photo
              }
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
            alignItems: 'center'
          }}>
            <Text style={{ fontSize: 18, color: '#5c5a62'}}>{ itemData.categoryName }</Text>
          </View>
        </View>
      
      </Pressable>
    )
}
