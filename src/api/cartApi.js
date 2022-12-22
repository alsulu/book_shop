import baseApi from "./baseApi";

export const getCartByUser = (userId) => 
    baseApi.get(`/cart?userId=${userId}`)

export const addToCart = (params={}) => {
    return baseApi.post(`/cart`, params)
}

export default {
    getCartByUser,
    addToCart
}