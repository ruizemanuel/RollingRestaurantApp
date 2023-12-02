import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { DrawerNavigator } from './DrawerNavigator';


const Stack = createStackNavigator();

export const StackNavigator = () => {

    const { state, checkToken } = useContext(AuthContext);

    return (
        <Stack.Navigator
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

            <Stack.Screen name="Drawer" component={DrawerNavigator} />

        </Stack.Navigator>

    )
}