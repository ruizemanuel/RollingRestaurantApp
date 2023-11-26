import React, { useContext, useState } from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { globalStyles } from '../../themes/globalThemes';
import { CustomPassInput } from '../../components/CustomPassInput';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';



export const RegisterScreen = () => {

    const { register, state } = useContext(AuthContext);
    const { navigate } = useNavigation();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repPassword: '',
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            name: Yup.string()
                .required('El campo nombre  es  requerido')
                .min(4, 'el nombre requiere minimo 4 caracteres'),
            email: Yup.string()
                .email('El formato del email es incorrecto')
                .required('El campo email  es  requerido'),
            password: Yup.string()
                .required('El campo contraseña es requerido')
                .min(8, 'contraseña requiere minimo 8 caracteres'),
            repPassword: Yup.string()
                .required('El campo repetir contraseña es requerido')
                .min(8, 'contraseña requiere minimo 8 caracteres')
        }),
        onSubmit: (values, { resetForm }) => {
            if (formik.values.password === formik.values.repPassword) {
                register(
                    formik.values.name,
                    formik.values.email,
                    formik.values.password,
                    formik.values.repPassword,
                ).then(() => {
                    resetForm();
                    navigate('Login');
                })
            } else {
                ToastAndroid.show("Las contraseñas no coinciden", ToastAndroid.SHORT);
            }
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
                        placeholder='Nombre'
                        placeholderTextColor={'#fff'}
                        inputMode='text'
                        value={formik.values.name}
                        maxLength={16}
                        name='name'
                        onChangeText={(value) => formik.setFieldValue('name', value)}
                    />
                    {formik.errors.name && (
                        <Text style={{
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: 16
                        }}>
                            {formik.errors.name}
                        </Text>
                    )}
                    <TextInput
                        style={globalStyles.defaultInputText}
                        placeholder='Email'
                        placeholderTextColor={'#fff'}
                        inputMode='email'
                        value={formik.values.email}
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

                    <CustomPassInput name={'password'} formik={formik} errors={formik.errors.password} value={formik.values.password} placeholder={'Contraseña'} />
                    <CustomPassInput name={'repPassword'} formik={formik} errors={formik.errors.repPassword} value={formik.values.repPassword} placeholder={'Repetir Contraseña'} />
                </View>
                {
                    !state.isLoading ?
                        <View>
                            <TouchableOpacity
                                style={styles.defaultBtn}
                                onPress={formik.handleSubmit}
                            >
                                <Text style={globalStyles.defaulTextBtn}> REGISTRARSE </Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#fff' }}>¿Ya tienes una cuenta?{" "}</Text>
                                <Pressable onPress={() => navigate('Login')}>
                                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>Inicia sesión</Text>
                                </Pressable>
                            </View>
                        </View> :
                        <ActivityIndicator size="large" color='#fff' />
                }

            </View>

            {/* <CustomModal 
            status={modal}
            title='Error de Acceso'
            msg={state.errorMessage}
        /> */}
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


