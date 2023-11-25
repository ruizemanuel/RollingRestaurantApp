import React, { useReducer } from 'react';
import { restaurantApiUrl } from '../config/restaurantApi';
import { types } from '../types/types';
import { PedidoReducer } from '../reducers/PedidoReducer';
import { PedidoContext } from '../contexts/PedidoContext';

const initialState = {
    isLoading: true,
    errorMessage: '',
    pedidos: null,
}

export const PedidoProvider = ({ children }) => {

    const [state, dispatch] = useReducer(PedidoReducer, initialState);


    const getPedidos = async() => {

        try {
            const pedidos = await restaurantApiUrl.get('/pedidos');

            if(!pedidos){
                dispatch({
                    type: types.pedidos.error,
                    payload: {
                        errorMessage: 'No existen Pedidos activos'
                    }
                })
            }
            
            dispatch({
                type: types.pedidos.getPedidos,
                payload:  {
                    pedidos: pedidos.data,
                }
            })

            
        } catch (error) {
            dispatch({
                type: types.pedidos.error,
                payload:  {
                    errorMessage: error.response.data.msg
                }
            })
        }
    }

    return (
        <PedidoContext.Provider value={{
            state,
            getPedidos,
        }}>
            { children}
        </PedidoContext.Provider>
  )
}
