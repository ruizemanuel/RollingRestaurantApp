import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext, useEffect, useState } from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/auths/ProfileScreen';
import { TabsNavigator } from './TabsNavigator';
import { LoginScreen } from '../screens/auths/LoginScreen';
import { AuthContext } from '../contexts/AuthContext';
import { CustomLoading } from '../components/CustomLoading';
import { CartContext } from '../contexts/CartContext';
import { ToastAndroid } from 'react-native';

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
      </Drawer.Navigator>
    )
  }
}
