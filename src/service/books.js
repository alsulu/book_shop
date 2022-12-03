const books = new Map()

export const getBook = (bookIsbn13) => {
    return books.get(bookIsbn13)
}

export const setBook = (book) => {
    books.set(book.isbn13, book)
}

export default {
    getBook,
    setBook
}