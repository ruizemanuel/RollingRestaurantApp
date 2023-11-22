import React, { useContext } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProductContext } from '../contexts/ProductContext';

export const CustomCardCategories = ({itemData}) => {
    const { navigate } =  useNavigation();
    const { state } = useContext(ProductContext);
    const filteredProducts = state.products?.filter((product) => product.category == itemData.categoryName.toLowerCase());

    const onPressCategory = () => {
      navigate('SearchProductScreen', {
        filteredProducts,
      })
    }

    return (
      filteredProducts.length !== 0 && <Pressable
        style={{
          marginHorizontal:5,
          backgroundColor: '#fff',
          // borderColor: 'rgba(255,255,255,0.1)',
          // borderWidth:2,
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
