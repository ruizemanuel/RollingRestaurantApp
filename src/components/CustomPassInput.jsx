import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'; 



export const CustomPassInput = ({ name,  formik, errors, value, placeholder }) => {

    const[eye, setEye] = useState(true)

  return (
    <View  style={styles.container}>
       <Feather 
            name= { eye ? 'eye-off' : 'eye' }  
            size={21} 
            color={'#fff'}
            style={ styles.iconSearch }
            onPress={() => setEye(!eye)}
        />
        <TextInput 
            style={ styles.input }
            placeholder={placeholder}
            placeholderTextColor={'#fff'}
            secureTextEntry={eye}
            value={value}
            name={name}
            onChangeText={(value) => formik.setFieldValue(name, value)}
        />
        { errors &&  (
            <Text style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 16
            }}>
                { errors }
            </Text>
        )}
    </View>
  )
}

const styles = StyleSheet.create({

    container:  {
        justifyContent: 'center',
    },

    input: {
        borderWidth:  2,
        borderColor: '#fff',
        borderRadius: 40,
        fontSize: 15,
        color: '#fff',
        paddingVertical: 7,
        paddingHorizontal: 15,
        marginHorizontal: 12,
        marginVertical: 12
    },

    iconSearch: {
        position: 'absolute',
        right: 30,
        zIndex: 9999999
    },
})
