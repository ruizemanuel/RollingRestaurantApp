import { useReducer } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { AuthReducer } from "../reducers/AuthReducer"
import { restaurantApiUrl } from "../config/restaurantApi"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { types } from "../types/types"

const initialState = {
    user: null,
    isLogged: false,
    isLoading: false,
    msg: ''
}


export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const login = async (email, password) => {
        try {

            dispatch({
                type: types.auth.loading,
            });

            const user = await restaurantApiUrl.post('/auth/login', {
                email,
                password
            });
            await AsyncStorage.setItem('x-access-token', user.data.token);
            await AsyncStorage.setItem('email', user.data.email);
            let favorites = (await AsyncStorage.getItem('userFavorites')) ?? [];
            if(favorites.length !== 0){
                favorites = JSON.parse(favorites)
            }
            const userData = {...user.data, favorites}

            dispatch({
                type: types.auth.login,
                payload: {
                    user: userData
                }
            });

        } catch (error) {
            dispatch({
                type: types.auth.error,
                payload: {
                    errorMessage: error.response.data.message
                }
            })
        }
    }

    const register = async (name, email, password, passwordrep) => {
        try {

            dispatch({
                type: types.auth.loading,
            });

            const user = await restaurantApiUrl.post('/auth/register', {
                name,
                email,
                password,
                passwordrep,
                roles: ['user'],
                activo: true
            });

            dispatch({
                type: types.auth.register,
                payload: {
                    user: user.data
                }
            });

        } catch (error) {
            dispatch({
                type: types.auth.error,
                payload: {
                    errorMessage: error.response.data.message
                }
            })
        }
    }


    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('e-token');
            if (!token) {
                dispatch({
                    type: types.auth.logout
                });
            }

            const { data } = await restaurantApiUrl.get('/auth/user/review/token');

            dispatch({
                type: types.auth.login,
                payload: {
                    user: data.res
                }
            });

        } catch (error) {
            return dispatch({
                type: types.auth.error,
            })
        }
    }

    const updateFavs = (favs) => {
        dispatch({
            type: types.auth.updateFavorites,
            payload: {
                favorites: favs
            }
        });
    }

    const logout = async () => {

        dispatch({
            type: types.auth.logout
        });
    }

    return (
        <AuthContext.Provider value={{
            state,
            login,
            register,
            checkToken,
            updateFavs,
            logout,
        }}

        >
            {children}
        </AuthContext.Provider>
    )
}