import React, { useContext, useState } from 'react'
import { Image, Pressable, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import { FlatList } from 'react-native'
import { View } from 'react-native'
import { CartContext } from '../../contexts/CartContext'
import { globalStyles } from '../../themes/globalThemes'
import { AntDesign } from 'react-native-vector-icons';
import { CustomQuantity } from '../../components/CustomQuantity'
import { useQuantity } from '../../hooks/useQuantity'
import { useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { EmptyCartScreen } from './EmptyCartScreen'

export const CheckoutScreen = ({ navigation }) => {

    const { updateCartItem, removeCart, sendCart, removeAllCart, state } = useContext(CartContext);
    const userData = useContext(AuthContext).state;
    const { navigate } = useNavigation();

    const removeItem = (index) => {
        state.cart.splice(index, 1);
        removeCart(state.cart);
    }
    const [quantities, setQuantities] = useState(state.cart.map((item) => ({ id: item.id, quantity: item.qty })));
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setQuantities(state.cart.map((item) => ({ id: item.id, quantity: item.qty })));
        totalCart();
    }, [state.cart])

    const totalCart = () => {
        const totalCartItems = state.cart.reduce((acc, item) => {
            return acc + item.qty * item.price;
        }, 0);
        setTotal(totalCartItems)
    }

    const postCart = () => {
        const cart = { pedido: state.cart, email: userData.user.email, estado: "-", total }
        sendCart(cart)
        removeAllCart();
        navigate('HomeScreen');
    }

    const handleUpdateQuantity = (itemId, newQuantity) => {
        setQuantities((prevQuantities) =>
            prevQuantities.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
        updateCartItem(itemId, newQuantity);
    };

    const cartRender = (item, index) => {
        const quantity = quantities.find((q) => q.id === item.id)?.quantity || 0;

        return (
            <View style={{
                backgroundColor: '#ccc',
                flexDirection: 'row',
                borderWidth: 2,
                borderColor: '#e8e8e8',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderTopEndRadius: 10,
                borderBottomEndRadius: 10,
                padding: 10
            }}>
                <View style={{
                    flex: 1,
                    marginRight: 10
                }}>
                    <Image
                        source={{ uri: item.urlImg }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 5
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 3,
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}>
                    <View>
                        <Text style={{ fontSize: 12, color: '#888', }}>{item.category}</Text>
                        <Text style={{ fontSize: 13, color: '#000' }}>{item.productName}</Text>
                        <Text style={{ fontSize: 14, color: '#ff6347', fontWeight: 'bold' }}>${item.price}</Text>
                    </View>
                </View>
                <View style={{ flex: 2, alignItems: 'center' }}>
                    <CustomQuantity
                        quantity={quantity}
                        sumQuantity={() =>
                            handleUpdateQuantity(item.id, quantity + 1)
                        }
                        restQuantity={() =>
                            handleUpdateQuantity(item.id, Math.max(quantity - 1, 0))
                        }
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Pressable
                        onPress={() => removeItem(index)}
                    >
                        <AntDesign name='delete' size={26} color={'#ff6347'} />
                    </Pressable>
                </View>
            </View>
        )
    }

    return (

        state.cart.length !== 0 ? <View style={globalStyles.container}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={state.cart}
                    renderItem={({ item, index }) => cartRender(item, index)}
                    keyExtractor={item => item.id}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 18, color: '#888', }}>Total</Text>
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>${total}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#ff6347',
                            fontSize: 16,
                            alignSelf: 'center',
                            borderRadius: 20,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                            marginTop: 25
                        }}
                        onPress={postCart}
                    >
                        <Text style={globalStyles.defaulTextBtn}> Finalizar Compra </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View> : <EmptyCartScreen />


    )
}
