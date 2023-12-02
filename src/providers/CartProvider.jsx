import React, { useContext, useReducer } from 'react'
import { CartReducer } from '../reducers/CartReducer'
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { types } from '../types/types';
import { restaurantApiUrl } from '../config/restaurantApi';


const initialState = {
    isLoading: true,
    cart: [],
    msg: ''
}


export const CartProvider = ({ children }) => {
  
    const [  state, dispatch ] = useReducer(CartReducer,  initialState);
    const { state: userData } = useContext(AuthContext);


    const addCart = async(productData) =>  {
        
        const addProduct = [
            ...state.cart,
            {
                id: productData.product._id,
                productName: productData.product.productName,
                urlImg: productData.product.urlImg,
                price: productData.product.price,
                qty: productData.qty,
                category: productData.product.category
            }
        ]

        dispatch({
            type: types.cart.addCart,
            payload: {
                cart: addProduct
            }
        })

    }

    const removeCart = async(cart) =>  {

        dispatch({
            type: types.cart.removeCart,
            payload: {
                cart
            }
        })
    }

    const removeAllCart = async() =>  {

        dispatch({
            type: types.cart.removeAllCart,
        })
    }

    const updateCartItem = async (itemId, newQuantity) => {
        const updatedCart = state.cart.map((item) =>
            item.id === itemId ? { ...item, qty: newQuantity } : item
        );

        dispatch({
            type: types.cart.updateCart,
            payload: {
                cart: updatedCart,
            },
        });
    };

    const sendCart = async (cart) => {
        try {

            const order = await restaurantApiUrl.post('/pedidos', cart);

            dispatch({
                type: types.cart.msgCart,
                payload: {
                    msg: order.data.message
                }
            });

        } catch (error) {
            dispatch({
                type: types.cart.error,
                payload: {
                    errorMessage: error.response.data.message
                }
            })
        }
    }
  
  
    return (
        <CartContext.Provider value={{
            state,
            addCart,
            removeCart,
            updateCartItem,
            sendCart,
            removeAllCart,
        }}>
            { children }
        </CartContext.Provider>

  )
}
