import React from 'react'
import { Image, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export const CustomItemSearch = ({ item }) => {

  const { navigate } = useNavigation();

  const getDate = () => {
    if (item && item.date) {
      const date = item.date.split('T')[0].split('-');
      const formattedDate = date[2] + "-" + date[1] + "-" + date[0];
      return formattedDate;
    }
    return 'Fecha no disponible';
  }

  const handleClickItem = () => {
    if (!item.estado) {
      const itemData = item;
      navigate('ProductsScreen', {
        itemData,
      })
    } else{
      const pedidoDate = getDate();
      navigate('PedidoDetailScreen', {
        item, pedidoDate,
      })
    }
  }

  return (

    <Pressable onPress={handleClickItem}>
      <View style={{
        flexDirection: 'row',
        borderWidth: 2,
        marginBottom: 10,
        borderColor: '#e8e8e8',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
      }}>
        <Image style={{
          flex: 1,
          height: 90,
        }}
          source={!item.estado ? { uri: item.urlImg } : require("../../assets/photo/pedido.jpg")}
        />
        {item.estado ? <View style={{ flex: 3, marginLeft: 10 }}>
          <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{item.estado} - {getDate()}</Text>
          <Text style={{ fontSize: 12, color: '#5e5d62', }}>{' '}</Text>
          <Text style={{ fontSize: 16, color: '#ff6347', fontWeight: 'bold' }}>${item.total} - {item.pedido.length} productos</Text>
        </View> :
          <View style={{ flex: 3, marginLeft: 10 }}>
            <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{item.productName}</Text>
            <Text style={{ fontSize: 12, color: '#5e5d62', }}>{item.category}</Text>
            <Text style={{ fontSize: 14, color: '#ff6347', fontWeight: 'bold' }}>${item.price}</Text>
          </View>
        }
        <View style={{ flex: 1, alignItems: 'center' }}>
          <AntDesign name='right' size={24} color={'#ff6347'} />
        </View>
      </View>
    </Pressable>
  )
}
