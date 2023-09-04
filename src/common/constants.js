const appConstants = {
    routes: {
        index: '/',
        //book: '/book',
        search: '/search/:search',
        cart: '/cart',
        wishlist: '/wishlist',
        profile: '/profile',
        register: '/register',
        login: '/login',
        book: '/book/:book',
        user: '/user/:user',
    },
    search: {
        types: {
            book: 'book',
            user: 'user',
            cart: 'cart'
        }
    },
    lists: {
        types: {
            book: 'book',
            user: 'user',
            cart: 'cart'
        }
    }
}

export default appConstants;