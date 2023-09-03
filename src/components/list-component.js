import appConstants from '../common/constants';
import { newarr, isLoaded, updateCartByUser } from '../common/common';
//import { render } from '../router';
import { goTo } from '../router';
import { getBook, setBook } from '../service/books';
import { getUser, setUser } from '../service/users';
import { getBooksBySearch, getNewBooks } from '../api/booksApi';
import { getUsersSearch } from '../api/usersApi';
import { getCartByUser, addToCart } from '../api/cartApi';

class ListComponent extends HTMLElement {
    constructor() {
        super();
        this.search = '';
        this.page = 1;
        this.lastPage = false;
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
                if (this.typeList === appConstants.lists.types.book)
                    this.getBooksPage();
                if (this.typeList = appConstants.lists.types.user)
                    this.getUsersPage();
            }
        })

        const nextBtn = document.createElement('button');
        nextBtn.setAttribute('class', 'pagination__next-btn');
        nextBtn.textContent = 'Next';
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!this.lastPage) {
                this.page++;
                if (this.typeList === appConstants.lists.types.book)
                    this.getBooksPage();
                if (this.typeList = appConstants.lists.types.user)
                    this.getUsersPage();
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
        this.updateList()
    }

    updatePage() {
        const shadow = this.shadowRoot;
        const prevBtn = shadow.querySelector('.pagination__prev-btn');
        const nextBtn = shadow.querySelector('.pagination__next-btn');
        const pageNumber = shadow.querySelector('.pagination__number');
        console.log(prevBtn);
        
        if (this.page === 1)
            prevBtn.setAttribute('disabled', true)
        else
            prevBtn.removeAttribute('disabled');

        if (!this.lastPage)
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
        /*if (typeList === 'cart')
            this.getCartPage();*/
        if (typeList === 'user')
            this.getUsersPage();
    }

    getBooksPage() {
        const shadow = this.shadowRoot;
        const wrapper = shadow.querySelector('.list-container');
        const search = this.getAttribute('search');
        const id = this.getAttribute('id');

        if (search)
            this.search = search;

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
                this.lastPage = books.total%10===0 ? this.page = books.total/10 : this.page = books.total/10+1;
                const count = books.total;
                //pagination.setAttribute('last', this.lastPage);
                wrapper.innerHTML = '';

                await updateCartByUser()

                books.books.forEach(book => {
                    if (book.isbn13 !== id) {
                        setBook(book);
                        const bookElement = document.createElement('book-component');
                        bookElement.setAttribute('id', book.isbn13);
                        if (isLoaded) {
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
            
            /*if (isLoaded)
                if (newarr.indexOf(book.isbn13) >= 0) 
                        bookElement.setAttribute('isAdded', true)

        /*getCartByUser(1)
            .then(data => {
                console.log(data);
                data.forEach(el=> newarr.push(el.bookId)
                        /* {
                            button.innerText = "Added"
                            button.setAttribute("disabled", true)
                        }}*//*)
            })
            .catch (err => console.log(err.message))*/

    }

    /*getCartPage() {
        const shadow = this.shadowRoot;
        const wrapper = shadow.querySelector('.list-container');
        const search = this.getAttribute('search');
        const id = this.getAttribute('id');
    }*/

    getUsersPage() {
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

        apiCall
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
    }
}

customElements.define('list-component', ListComponent)