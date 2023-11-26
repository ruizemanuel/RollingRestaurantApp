import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext, useEffect } from 'react';
import { TabsNavigator } from './TabsNavigator';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { ToastAndroid } from 'react-native';
import { ProductsScreen } from '../screens/products/ProductsScreen';
import { PedidoDetailScreen } from '../screens/pedidos/PedidoDetailScreen';
import { SearchProductScreen } from '../screens/products/SearchProductScreen';
import { LoginScreen } from '../screens/auths/LoginScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {

  const { state, checkToken } = useContext(AuthContext);
  const message = useContext(CartContext).state;

  useEffect(() => {
    if (state.isLogged && message.msg) {
      ToastAndroid.show(message.msg, ToastAndroid.SHORT);
    }
  }, [message.msg])

  // useEffect( () => {
  //   checkToken();
  // },[])

  if (!state.isLogged) {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name='Login' options={{ title: 'LOGIN', headerShown: false }} component={LoginScreen} />
      </Drawer.Navigator>
    )
  } else {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name='Home' options={{ title: 'HOME', headerShown: false }} component={TabsNavigator} />
        <Drawer.Screen name="SearchScreen" options={{ title: 'SEARCH', headerShown: false }} component={SearchProductScreen} />
        <Drawer.Screen name="ProductsScreen" options={{ title: 'PRODUCTS', headerShown: false }} component={ProductsScreen} />
        <Drawer.Screen name="PedidoDetailScreen" options={{ title: 'PEDIDO', headerShown: false }} component={PedidoDetailScreen} />
      </Drawer.Navigator>
    )
  }

}
