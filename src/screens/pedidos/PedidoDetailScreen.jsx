import React, { useContext, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";

export const PedidoDetailScreen = ({ route }) => {

    const { item, pedidoDate } = route.params;
    const  {navigate}  = useNavigation();

    const renderCard = (itemData) => {
        return (
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
                    source={{ uri: itemData.urlImg }}
                />
                <View style={{ flex: 3, marginLeft: 10 }}>
                    <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{itemData.productName}</Text>
                    <Text style={{ fontSize: 12, color: '#5e5d62', }}>{itemData.category}</Text>
                    <Text style={{ fontSize: 14, color: '#ff6347', fontWeight: 'bold' }}>${itemData.price} x {itemData.qty}</Text>
                </View>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity
                        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', marginLeft: 5}}
                            onPress={() => navigate('ProfileScreen')}
                        >
                            <Ionicons name='arrow-back' size={28} color='#ff6347' />
                        </TouchableOpacity>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Detalle de Pedido</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 55 }}>
                <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold', marginBottom: 5 }}>{item.estado}</Text>
                <Text style={{ fontSize: 16, color: '#888' }}>{pedidoDate}</Text>
            </View>

            <FlatList
                style={{ paddingHorizontal: 7 }}
                data={item.pedido}
                renderItem={({ item }) => renderCard(item)}
                keyExtractor={item => item._id}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 18, color: '#000', }}>Total</Text>
                <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>${item.total}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 15,
        paddingBottom: 80
    },

    head: {
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 0,
        top: 0,
    },

    menuContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10,
        zIndex: 999,
    },
})
