import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { globalStyles } from '../themes/globalThemes';

import { categoriesData } from '../data/categoriesData';
import { CustomCardProducts } from '../components/products/CustomCardProducts';
import { ProductContext } from '../contexts/ProductContext';
import Carousel from 'react-native-new-snap-carousel';
import { CustomModalBottom } from '../components/CustomModalBottom';
import { CustomCardCategories } from '../components/CustomCardCategories';
import { bannersData } from '../data/bannersData';



export const HomeScreen = ({ navigation }) => {

  const { getProducts, state } = useContext(ProductContext);
  const [refreshing, setRefreshing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getProducts();
      setRefreshing(false);
    }, 5000);
  };

  const onFilter = () => {
    setOpenModal(!openModal);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const renderBanner = (item) => {
    return (
      <View style={{
        width: 380,
        height: 150,
      }}
      >
        <Image
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
          source={item.photo}
        />

      </View>
    )
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.headContainer}>

        <Carousel
              ref={(c) => { this._carousel = c; }}
              refreshControl={
                <RefreshControl 
                    refreshing={refreshing} 
                    onRefresh={onRefresh}
                />
              }
              data={bannersData}
              renderItem={({item}) => renderBanner(item)}
              sliderWidth={380}
              itemWidth={380}
              autoplay={true}
              loop={true}
              firstItem={0}
              autoplayInterval={6000}
          />
      </View>

      <View style={{ flex: 2, marginVertical: 10 }}>
          <FlatList
            data={categoriesData}
            renderItem={({ item }) => <CustomCardCategories itemData={item} />}
            keyExtractor={item => item.id}
            horizontal={true}
          />
        </View>

      <View style={{ flex: 3, }}>
        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold', margin: 5 }}>Destacados</Text>
        <FlatList
          data={state.products}
          renderItem={({ item }) => <CustomCardProducts itemData={item} />}
          keyExtractor={item => item._id}
          horizontal={true}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({

  headContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  head: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    top: 0,
    alignItems: 'flex-end'
  },

  menuContainer: {
    backgroundColor: '#ff6347',
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    zIndex: 999,
    alignSelf: 'center',
    marginTop: 10
  },

  menuBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuBtnText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#ccc'
  },

  headImage: {
    width: 380,
    borderRadius: 15,
    opacity: 0.8,
    marginBottom: 15
  }
})