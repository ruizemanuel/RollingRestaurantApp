import { useReducer } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { AuthReducer } from "../reducers/AuthReducer"
import { restaurantApiUrl } from "../config/restaurantApi"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { types } from "../types/types"

const initialState = {
    user: null,
    isLogged: false,
    isLoading: true,
    errorMessage: ''
}


export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const login = async (email, password) => {
        try {

            const user = await restaurantApiUrl.post('/auth/login', {
                email,
                password
            });
            await AsyncStorage.setItem('x-access-token', user.data.token);
            await AsyncStorage.setItem('email', user.data.email);
            const favorites = await AsyncStorage.getItem('userFavorites') ?? [];
            const datos = {...user.data, favorites}

            dispatch({
                type: types.auth.login,
                payload: {
                    user: datos
                }
            });

        } catch (error) {
            dispatch({
                type: types.auth.error,
                payload: {
                    errorMessage: error.response.data.msg
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
            checkToken,
            updateFavs,
            logout,
        }}

        >
            {children}
        </AuthContext.Provider>
    )
}