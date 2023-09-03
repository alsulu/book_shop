import baseApi from "./baseApi";

export const getCartByUser = () => 
    baseApi.get(`/cart`)

export const addToCart = (params={}) => {
    return baseApi.post(`/cart`, params)
}

export const updateCart = (id, params={}) => {
    return baseApi.put(`/cart/${id}`, params)
}

export const deleteFromCart = (id, params) => {
    return baseApi.delete(`/cart/${id}`, params)
}

export default {
    getCartByUser,
    addToCart,
    updateCart,
    deleteFromCart
}