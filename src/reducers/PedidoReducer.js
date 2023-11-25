import { types } from '../types/types'

export const PedidoReducer = (state = {}, action) => {

    switch (action.type) {

        case types.pedidos.getPedidos:
            return {
                ...state,
                isLoading: false,
                errorMessage: '',
                pedidos: action.payload.pedidos
            }


        case types.pedidos.getPedido:
            return {
                ...state,
                isLoading: false,
                errorMessage: '',
                pedidos: action.payload.pedido
            }

        case types.pedidos.error:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload.errorMessage,
                pedidos: null
            }

        default: {
            return state
        }
    }
}
