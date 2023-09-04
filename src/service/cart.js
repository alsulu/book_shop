const cart = new Map()
const cartCountServ = 0;

export const getBookFromCart = (bookIsbn13) => {
    return cart.get(bookIsbn13)
}

export const setCart = (book) => {
    cart.set(book.isbn13, book)
    cartCountServ++
}
export const deleteFromCart = (bookIsbn13) => {
    cart.delete(bookIsbn13)
    cartCountServ--;
}

export default {
    getBookFromCart,
    setCart,
    deleteFromCart
}