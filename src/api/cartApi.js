import baseApi from "./baseApi";

export const getCartByUser = (userId) => {
    return baseApi.get(`/cart?userId=${userId}&_expand=user`)
}

export const addToCart = (userId) => {
    return baseApi.post(`/cart?userId=${userId}/book`)
}

export default {
    getCartByUser,
    addToCart
}