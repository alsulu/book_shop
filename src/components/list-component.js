import { newarr, isLoaded, cartCount, updateCartByUser } from '../common/common';
import { setBook } from '../service/books';
import { getBooksBySearch, getNewBooks, getBookByISBN } from '../api/booksApi';

class ListComponent extends HTMLElement {
    constructor() {
        super();
        this.search = '';
        this.page = 1;
        this.lastPage = 1;

        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'list-container');

        const title = document.createElement('h2');
        title.setAttribute('class', 'list-title');
        shadow.appendChild(title);

        const style = document.createElement('style');
        style.textContent = `
            .list-container {
                margin-bottom: 30px;
            }
        `

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }

    async connectedCallback() {
        const shadow = this.shadowRoot;
        const search = this.getAttribute('search');
        const wrapper = shadow.querySelector('.list-container');
        
        wrapper.textContent = "Подождите, идёт загрузка..."
        
        await updateCartByUser();
        if (isLoaded) {
            if (search) {
                this.createPagination();
            }
            else 
                this.updateList();
        }
    }

    static get observedAttributes() {
        return ['search', 'lastPage']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'search') 
            this.updateList();
        if (name === 'lastPage')
            this.updatePage();
    }

    createPagination() {
        const shadow = this.shadowRoot;
        const pagination = document.createElement('pagination-component');
        pagination.setAttribute('page', this.page)
        pagination.setAttribute('last', this.lastPage)

        pagination.addEventListener('back-to-page', (e) => {
            e.stopPropagation();
            if (this.page > 1) {
                this.page--;
                this.updatePage();
                this.getBooksPage();
            }
        })
        pagination.addEventListener('to-next-page', (e) => {
            e.stopPropagation();
            if (this.page != this.lastPage) {
                this.page++;
                this.updatePage();
                this.getBooksPage();
            }
        })
        shadow.appendChild(pagination);
    }

    updatePage() {
        const shadow = this.shadowRoot;
        const pagination =  shadow.querySelector('pagination-component');
        pagination.setAttribute('last', this.lastPage)
        pagination.setAttribute('page', this.page)
    }

    updateList() {
        const shadow = this.shadowRoot;
        const title = shadow.querySelector('.list-title');
        const titleName = this.getAttribute('title');
        const typeList = this.getAttribute('list-type');

        if (typeList === 'book') {
            title.textContent = titleName;
            this.getBooksPage();
        }
        if (typeList === 'cart') {
            title.textContent = titleName + ` (${cartCount})`;
            this.getCartPage();
        }
    }

    getBooksPage() {
        const shadow = this.shadowRoot;
        const wrapper = shadow.querySelector('.list-container');
        const search = this.getAttribute('search');
        const id = this.getAttribute('id');
        
        if (search) {
            this.search = search;
        }

        const apiCall = this.search ? getBooksBySearch(this.search, this.page) : getNewBooks();
        
        apiCall
            .then((books) => {
                const fragment = document.createDocumentFragment();
                this.lastPage = Math.floor(books.total%10===0 ? books.total/10 : books.total/10+1) || 1;
                const count = books.total;
                wrapper.innerHTML = '';

                if (count == 0) {
                    const notFound = document.createElement('p');
                    notFound.textContent = "Books are not found";
                    fragment.appendChild(notFound)
                }

                books.books.forEach(book => {
                    if (book.isbn13 !== id) {
                        setBook(book);
                        const bookElement = document.createElement('book-component');

                        bookElement.setAttribute('id', book.isbn13);
                        const index = newarr.map(e => e.bookId).indexOf(book.isbn13);

                        if (index >= 0) {
                            const count = newarr[index].count;
                            bookElement.setAttribute('isAdded', true);
                            bookElement.setAttribute('count', count);
                        }

                        if (this.search) 
                            bookElement.setAttribute('search', this.search)
                        fragment.appendChild(bookElement);
                    }
                });
                wrapper.appendChild(fragment);
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
        wrapper.textContent = 'Идёт загрузка корзины...';

        await updateCartByUser();

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
                        }
                        fragment.appendChild(bookElement);
                    }
        })
                .catch((error) => {
                    console.log(error);
                })
        }))
        wrapper.innerHTML = '';
        wrapper.appendChild(fragment);
        if (!cartCount)
            wrapper.textContent = "Cart is empty"
    }

}

customElements.define('list-component', ListComponent)