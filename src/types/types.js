export const types = {
    auth: {
        login:  'LOGIN',
        logout: 'LOGOUT',
        error:  'ERROR'
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
    }
}