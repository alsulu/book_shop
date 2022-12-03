import baseApi from "./baseApi";

export const getWishlistByUser = (userId) => {
    return baseApi.get(`/wishlist?userId=${userId}&_expand=user`)
}

export default {
    getWishlistByUser
}