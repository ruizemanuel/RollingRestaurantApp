export const types = {
    auth: {
        login:  'LOGIN',
        register:  'REGISTER',
        logout: 'LOGOUT',
        error:  'ERROR',
        loading: 'LOADING',
        updateFavorites: 'UPDATE'
    },

    products: {
        getProducts:  'PRODUCTS',
        getProduct:   'PRODUCT BY ID',
        error:        'ERROR PRODUCT'
    },

    cart: {
        addCart: 'ADDCART',
        removeCart: 'REMOVECART',
        removeAllCart: 'REMOVEALLCART',
        msgCart: 'MSGCART',
        updateCart: 'UPDATECART',
        error:  'ERROR'
    },

    pedidos: {
        getPedidos:  'PEDIDOS',
        getPedido:   'PEDIDO BY ID',
        error:        'ERROR PEDIDO'
    },
}