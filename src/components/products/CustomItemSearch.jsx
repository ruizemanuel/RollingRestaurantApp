import React from 'react'
import { Image, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const CustomItemSearch = ({item}) => {

  return (
      
    <View style={{
        flexDirection:  'row',
        borderWidth: 2,
        marginBottom: 10,
        borderColor: '#e8e8e8',
        justifyContent: 'center',
        alignItems:  'center',
        backgroundColor: '#fff',
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
      }}>
        <Image style={{
            flex:1,
            height: 90,
          }}

          source={{ uri: item.urlImg }}
        />
        <View style={{ flex:3, marginLeft: 10   }}>
          <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{ item.productName }</Text>
          <Text style={{ fontSize: 12, color: '#5e5d62',  }}>{ item.category }</Text>
          <Text style={{ fontSize: 14, color: '#ff6347', fontWeight: 'bold'}}>${ item.price }</Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center'}}>
          <AntDesign name='right' size={24} color={'#ff6347'} />
        </View>


      </View>
  )
}
