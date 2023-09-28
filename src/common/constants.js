const appConstants = {
    routes: {
        index: '/',
        search: '/search?q=:search',
        cart: '/cart',
        book: '/book/:book',
        //wishlist: '/wishlist',
    },
    search: {
        types: {
            book: 'book',
            cart: 'cart'
        }
    },
    lists: {
        types: {
            book: 'book',
            cart: 'cart'
        }
    }
}

export default appConstants;