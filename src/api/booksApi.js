export const getNewBooks = () => 
    fetch('https://api.itbook.store/1.0/new')
        .then((response) => {
            //console.log(response);
            if (response.ok)
                return response.json();
            else {
                throw new Error;
            }
        })
        /*.catch((error) => {
            console.log(error);
        })*/

export const getBookByISBN = (id) => 
    fetch('https://api.itbook.store/1.0/books/' + id)
        .then((response) => {
            //console.log(response);
            if (response.ok)
                return response.json();
            else {
                throw new Error;
            }
        })
        /*.catch((error) => {
            console.log(error);
        })*/

export const getBooksBySearch = (search, page) => 
    fetch(`https://api.itbook.store/1.0/search/${search}/${page}`)
        .then((response) => {
            //console.log(response);
            if (response.ok)
                return response.json();
            else {
                throw new Error;
            }
        })
        /*.catch((error) => {
            console.log(error);
        })*/

export default {
    getNewBooks,
    getBookByISBN,
    getBooksBySearch
}