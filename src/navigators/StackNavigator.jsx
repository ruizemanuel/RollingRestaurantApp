import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HomeScreen } from '../screens/HomeScreen';
import { ProductsScreen } from '../screens/products/ProductsScreen';
import { CheckoutScreen } from '../screens/carts/CheckoutScreen';
import { LoginScreen } from '../screens/auths/LoginScreen';
import { SearchProductScreen } from '../screens/products/SearchProductScreen';
import { PedidoDetailScreen } from '../screens/pedidos/PedidoDetailScreen';
import { ProfileScreen } from '../screens/auths/ProfileScreen';


const Stack = createStackNavigator();

export const StackNavigator = () => {


  return (
    <Stack.Navigator
        //initialRouteName='HomeScreen'
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: '#fff'
            },

            headerStyle: {
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                elevation: 5,
                shadowColor: '#000',
            }
        }}
    >
        <Stack.Screen name="HomeScreen"  component={HomeScreen} />
        <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
        <Stack.Screen name="SearchProductScreen" component={SearchProductScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="PedidoDetailScreen" component={PedidoDetailScreen} />
    </Stack.Navigator>
    
  )
}