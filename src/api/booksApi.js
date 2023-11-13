export const getNewBooks = () => 
    fetch('https://api.itbook.store/1.0/new')
        .then((response) => {
            if (response.ok)
                return response.json();
            else {
                throw new Error;
            }
        })
        .catch((error) => {
            console.log(error);
        })

export const getBookByISBN = (id) => 
    fetch('https://api.itbook.store/1.0/books/' + id)
        .then((response) => {
            if (response.ok)
                return response.json();
            else {
                throw new Error;
            }
        })
        .catch((error) => {
            console.log(error);
        })

export const getBooksBySearch = (search, page) => 
    fetch(`https://api.itbook.store/1.0/search/${search}/${page}`)
        .then((response) => {
            if (response.ok)
                return response.json();
            else {
                throw new Error;
            }
        })
        .catch((error) => {
            console.log(error);
        })

export default {
    getNewBooks,
    getBookByISBN,
    getBooksBySearch
}