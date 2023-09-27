import appConstants from '../common/constants';
import { newarr, isLoaded, cartCount, updateCartByUser } from '../common/common';
//import { render } from '../router';
import { goTo } from '../router';
import { getBook, setBook } from '../service/books';
import { getUser, setUser } from '../service/users';
import { getBooksBySearch, getNewBooks, getBookByISBN } from '../api/booksApi';
import { getUsersSearch } from '../api/usersApi';
import { getCartByUser, addToCart } from '../api/cartApi';

class ListComponent extends HTMLElement {
    constructor() {
        super();
        this.search = '';
        this.page = 1;
        this.lastPage = false;
        //this.getAttribute('upd') || false;
        //this.typeList = appConstants.lists.types.book;

        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'list-container');

        const title = document.createElement('h2');
        title.setAttribute('class', 'list-title');
        shadow.appendChild(title);

        //пагинация
        const pagination = document.createElement('div')
        pagination.setAttribute('class', 'pagination')

        const prevBtn = document.createElement('button');
        prevBtn.setAttribute('class', 'pagination__prev-btn');
        prevBtn.textContent = 'Prev';
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.page > 1) {
                this.page--;
                if (this.typeList === 'book')
                    this.getBooksPage();
                /*if (this.typeList = appConstants.lists.types.user)
                    this.getUsersPage();*/
            }
        })

        const nextBtn = document.createElement('button');
        nextBtn.setAttribute('class', 'pagination__next-btn');
        nextBtn.textContent = 'Next';
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.page !== this.lastPage) {
                this.page++;
                //if (this.typeList === 'book') {
                    //this.setAttribute('upd', true)
                    this.connectedCallback();
                //}
                    //this.getBooksPage();
                /*if (this.typeList = appConstants.lists.types.user)
                    this.getUsersPage();*/
            }
        })

        const pageNumber = document.createElement('span');
        pageNumber.setAttribute('class', 'pagination__number');
        pageNumber.textContent = this.page;

        pagination.appendChild(prevBtn);
        pagination.appendChild(pageNumber);
        pagination.appendChild(nextBtn);

        shadow.appendChild(wrapper);
        shadow.appendChild(pagination);

        /*const style = document.createElement('style');

        style.textContent = `
        `

        shadow.appendChild(style);*/
    }

    connectedCallback() {
        this.updatePage();
        this.updateList();
    }

    static get observedAttributes() {
        return ['search']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        //if (name === 'search')
            this.updateList();
        /*if (name === 'upd') {
            this.connectedCallback();
            console.log('upd')
        }*/
    }

    updatePage() {
        const shadow = this.shadowRoot;
        const prevBtn = shadow.querySelector('.pagination__prev-btn');
        const nextBtn = shadow.querySelector('.pagination__next-btn');
        const pageNumber = shadow.querySelector('.pagination__number');
        console.log(prevBtn);
        //this.getAttribute('upd') || false;
        
        if (this.page === 1)
            prevBtn.setAttribute('disabled', true)
        else
            prevBtn.removeAttribute('disabled');

        if (this.page === this.lastPage)
            nextBtn.setAttribute('disabled', true)
        else
            nextBtn.removeAttribute('disabled');
        
        pageNumber.textContent = this.page;
    }

    updateList() {
        const shadow = this.shadowRoot;
        const title = shadow.querySelector('.list-title');
        const titleName = this.getAttribute('title');
        const typeList = this.getAttribute('list-type');

        title.textContent = titleName;
        
        /*if (typeList)
            this.typeList = typeList;
            
        if (this.typeList === appConstants.lists.types.book*/

        if (typeList === 'book')
            this.getBooksPage();
        if (typeList === 'cart')
            this.getCartPage();
        /*if (typeList === 'user')
            this.getUsersPage();*/
    }

    getBooksPage() {
        const shadow = this.shadowRoot;
        const wrapper = shadow.querySelector('.list-container');
        const search = this.getAttribute('search');
        const id = this.getAttribute('id');
        const pagination = shadow.querySelector('.pagination');

        
        if (search)
            this.search = search;
        else
            shadow.removeChild(pagination)

        //const book = document.createElement('book-component');

        const apiCall = this.search ? getBooksBySearch(this.search, this.page) : getNewBooks();
        /*if (!this.lastPage) {
            const api = getBooksBySearch(this.search, this.page+1);
            api
                .then(books => {
                    this.lastPage
                })
        }*/
        //console.log('apicall', apiCall);

        //let newarr = [];

        apiCall
            .then(async (books) => {
                const fragment = document.createDocumentFragment();
                this.lastPage = Math.floor(books.total%10===0 ? books.total/10 : books.total/10+1);
                const count = books.total;
                //pagination.setAttribute('last', this.lastPage);
                wrapper.innerHTML = '';

                await updateCartByUser();
                //const book = books.books;
                //console.log(this.lastPage)

                /*for (let i=10*(this.page-1); i<10*this.page; i++) {
                    console.log(book[i].isbn13)
                    console.log(i);
                    //if (book[i].isbn13 !== id) {
                        setBook(book[i]);
                        const bookElement = document.createElement('book-component');
                        if (isLoaded) {

                            bookElement.setAttribute('id', book[i].isbn13);
                            const index = newarr.map(e => e.bookId).indexOf(book[i].isbn13);

                            if (index >= 0) {
                                const count = newarr[index].count;
                                bookElement.setAttribute('isAdded', true);
                                bookElement.setAttribute('count', count);
                            }
                        //}
                        if (this.search) 
                            bookElement.setAttribute('search', this.search)
                        fragment.appendChild(bookElement);
                    }
                }*/

                books.books.forEach(book => {
                    if (book.isbn13 !== id) {
                        setBook(book);
                        const bookElement = document.createElement('book-component');
                        if (isLoaded) {

                            bookElement.setAttribute('id', book.isbn13);
                            const index = newarr.map(e => e.bookId).indexOf(book.isbn13);

                            if (index >= 0) {
                                const count = newarr[index].count;
                                bookElement.setAttribute('isAdded', true);
                                bookElement.setAttribute('count', count);
                            }
                        }
                        if (this.search) 
                            bookElement.setAttribute('search', this.search)
                        fragment.appendChild(bookElement);
                    }
                });
                wrapper.appendChild(fragment);

                if (count === 0 & this.page === 1)
                    wrapper.textContent = 'Books are not found';
            })
            .catch((error) => {
                console.log(error);
            })
            
    }

    async getCartPage() {
        const shadow = this.shadowRoot;
        const fragment = document.createDocumentFragment();
        const wrapper = shadow.querySelector('.list-container');
        const id = this.getAttribute('id');
        wrapper.innerHTML = '';
        const total = document.createElement('p');
        const pagination = shadow.querySelector('.pagination');
        shadow.removeChild(pagination);

        await updateCartByUser();

        console.log('newarr', newarr)
        await Promise.all(newarr.map(async bookFromCart => {
            await getBookByISBN(bookFromCart.bookId)
                .then(book => {
                    if (book.isbn13 !== id) {
                        setBook(book);
                        const bookElement = document.createElement('book-component');
                        if (isLoaded) {
                            bookElement.setAttribute('id', bookFromCart.bookId);
                            bookElement.setAttribute('isAdded', true);
                            bookElement.setAttribute('count', bookFromCart.count);
                            bookElement.setAttribute('ifCart', true);
                            total.textContent = `Total: ${cartCount}`
                        }
                        fragment.appendChild(bookElement);
                    }
        })
                .catch((error) => {
                    console.log(error);
                })
        }))
        wrapper.appendChild(fragment);
        wrapper.appendChild(total)
        if (!cartCount)
            wrapper.textContent = "Cart is empty"

    }

    /*getUsersPage() {
        const shadow = this.shadowRoot;
        const wrapper = shadow.querySelector('list-container');
        //const book = document.createElement('book-component');

        const apiCall = this.search && getUsersSearch(this.search);
        /*if (!this.lastPage) {
            const api = getBooksBySearch(this.search, this.page+1);
            api
                .then(books => {
                    this.lastPage
                })
        }*/

        /*apiCall
            .then((users) => {
                const fragment = document.createDocumentFragment();
                this.lastPage = users.length < 10;
                const count = users.length;
                //pagination.setAttribute('last', this.lastPage);
                wrapper.innerHTML = '';

                users.forEach(user => {
                    setUser(user);
                    const userElement = document.createElement('user-component');
                    userElement.setAttribute('id', user.id)
                    if (this.search) {
                        userElement.setAttribute('search', this.search)
                    }
                    fragment.appendChild(userElement);
                });
                wrapper.appendChild(fragment);

                if (count === 0 & this.page === 1)
                    wrapper.textContent = 'Users are not found';
            })
            .catch((error) => {
                console.log(error);
            })
    }*/
}

customElements.define('list-component', ListComponent)