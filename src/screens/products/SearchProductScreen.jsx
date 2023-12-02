import React, { useContext, useEffect, useState } from 'react';
import { FlatList,View } from 'react-native';
import { CustomItemSearch } from '../../components/products/CustomItemSearch';
import { globalStyles } from '../../themes/globalThemes';
import { CustomTextSearch } from '../../components/products/CustomTextSearch';
import { ActivityIndicator } from 'react-native';
import { ProductContext } from '../../contexts/ProductContext';



export const SearchProductScreen = ({route}) => {

  const { state } = useContext(ProductContext);
  const filteredProducts = route.params ? route.params.filteredProducts : undefined;
  const searchData = filteredProducts ? filteredProducts : state.products

  const [searchText, setSearchText] = useState('');

  const filteredData = searchData?.filter((item) =>
    item.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderActivity = () => {
    return (
      <View style={{
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        <ActivityIndicator  size={24}  color={'#fff'} />
      </View>
    )
  }


  return (
    <View style={ globalStyles.container }>
        <CustomTextSearch onSearchTextChange={setSearchText}/>
        <FlatList 
          data={filteredData}
          renderItem={ ({item}) => <CustomItemSearch item={item}/> }
          keyExtractor={item => item._id}
          // onEndReached={loadMore}
          // onEndReachedThreshold={0.5}
          // ListFooterComponent={renderActivity}
        />
    </View>

  )
}


