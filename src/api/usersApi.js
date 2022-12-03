import baseApi from "./baseApi";

export const getUsersSearch = (search) => {
    return baseApi.get(`/users?q=${search}&limit=10&_expand=user`)
}

export default {
    getUsersSearch
}