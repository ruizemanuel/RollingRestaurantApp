import { types } from "../types/types";


export const AuthReducer = (state = {}, action) => {

    switch (action.type) {
        case types.auth.login:
            return {
                ...state,
                user: action.payload.user,
                isLogged: true,
                isLoading: false,
                msg: action.payload.user.message
            }

        case types.auth.register:
            return {
                ...state,
                user: action.payload.user,
                isLogged: false,
                isLoading: false,
                msg: action.payload.user.message
            }

        case types.auth.error:
            return {
                ...state,
                user: null,
                isLogged: false,
                isLoading: false,
                msg: action.payload.errorMessage
            }

        case types.auth.logout:
            return {
                ...state,
                user: null,
                isLogged: false,
                isLoading: false,
                msg: ''
            }

        case types.auth.updateFavorites:
            return {
                ...state,
                user: {
                    ...state.user,
                    favorites: action.payload.favorites,
                },
            };

        case types.auth.loading:
            return {
                ...state,
                isLoading: true,
            };

        default:
            return state;
    }
}