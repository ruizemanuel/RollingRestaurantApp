import React, { useContext, useState } from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { globalStyles } from '../../themes/globalThemes';
import { CustomPassInput } from '../../components/CustomPassInput';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';



export const LoginScreen = () => {

    const { login, state } = useContext(AuthContext);
    const { navigate } = useNavigation();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            email: Yup.string()
                .email('El formato del email  es incorrecto')
                .required('El campo email  es  requerido'),
            password: Yup.string()
                .required('El campo contraseña es requerido')
                .min(8, 'contraseña requiere minimo 8 caracteres')
        }),
        onSubmit: (values) => {
            login(
                formik.values.email,
                formik.values.password,
            )

        }
    })

    return (
        <>
            <View style={styles.container}>
                <View style={{ marginBottom: 30 }}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/LogoRolling.png')}
                    />
                </View>
                <View>
                    <TextInput
                        style={globalStyles.defaultInputText}
                        placeholder='Email'
                        placeholderTextColor={'#fff'}
                        inputMode='email'
                        name='email'
                        onChangeText={(value) => formik.setFieldValue('email', value)}
                    />
                    {formik.errors.email && (
                        <Text style={{
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: 16
                        }}>
                            {formik.errors.email}
                        </Text>
                    )}

                    <CustomPassInput name={'password'} formik={formik} errors={formik.errors.password} value={formik.values.password} placeholder={'Contraseña'}/>
                </View>
                {
                    !state.isLoading ?
                        <View>
                            <TouchableOpacity
                                style={styles.defaultBtn}
                                onPress={formik.handleSubmit}
                            >
                                <Text style={globalStyles.defaulTextBtn}> INGRESAR </Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#fff' }}>¿No tienes una cuenta?{" "}</Text>
                                <Pressable onPress={() => navigate('RegistroScreen')}>
                                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Registrate ahora</Text>
                                </Pressable>
                            </View>
                        </View> :
                        <ActivityIndicator size="large" color='#fff' />
                }


            </View>
        </>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ff6347',
        paddingHorizontal: 7,
        paddingTop: 15,
        paddingBottom: 80
    },

    logo: {
        width: 240,
        height: 120,
        alignSelf: 'center'
    },

    defaultBtn: {
        backgroundColor: '#ff6347',
        fontSize: 16,
        borderWidth: 2,
        borderColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignSelf: 'center',
        borderRadius: 20,
        marginVertical: 30,
    },
})


