import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

export const CustomTextSearch = () => {
     return (
        <View style={ styles.containerSearch }>
            <FontAwesome5 
                name="search" 
                size={20} 
                color="#ff6347" 
                style={ styles.iconSearch }
            />
            <TextInput 
                style={ styles.inputSearch }
                placeholder='Buscar Productos'
                placeholderTextColor='#6c6c6c'
            />
        </View>
    )
}

const styles = StyleSheet.create({

    containerSearch:  {
        marginVertical: 20,
        justifyContent: 'center',
        borderColor: 'rgba(255,255,255, 0.2)',
        borderWidth: 4,
        borderRadius: 50
    },

    iconSearch: {
        position: 'absolute',
        left: 20
    },

    inputSearch: {
        borderColor:  '#ff6347',
        borderWidth: 2,
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 15,
        textAlign: 'center',
        color: '#6c6c6c',
        shadowColor: '#ff6347',
    }

})


