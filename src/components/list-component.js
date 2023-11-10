import { newarr, isLoaded, cartCount, updateCartByUser } from '../common/common';
import { getBook, setBook } from '../service/books';
import { getUser, setUser } from '../service/users';
import { getBooksBySearch, getNewBooks, getBookByISBN } from '../api/booksApi';

class ListComponent extends HTMLElement {
    constructor() {
        super();
        this.search = '';
        this.page = 1;
        this.lastPage = false;

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
                this.connectedCallback();
            }
        })

        const nextBtn = document.createElement('button');
        nextBtn.setAttribute('class', 'pagination__next-btn');
        nextBtn.textContent = 'Next';
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.page !== this.lastPage) {
                this.page++;
                this.connectedCallback();
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

    }

    async connectedCallback() {
        await updateCartByUser();
        this.updatePage();
        this.updateList();
    }

    static get observedAttributes() {
        return ['search']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateList();
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
        const pagination = shadow.querySelector('.pagination');

        
        if (search)
            this.search = search;
        else
            shadow.removeChild(pagination)

        const apiCall = this.search ? getBooksBySearch(this.search, this.page) : getNewBooks();
        
        apiCall
            .then((books) => {
                const fragment = document.createDocumentFragment();
                this.lastPage = Math.floor(books.total%10===0 ? books.total/10 : books.total/10+1);
                const count = books.total;
                //pagination.setAttribute('last', this.lastPage);
                wrapper.innerHTML = '';
                console.log(books)

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
                            //total.textContent = `Total: ${cartCount}`
                        }
                        fragment.appendChild(bookElement);
                    }
        })
                .catch((error) => {
                    console.log(error);
                })
        }))
        //wrapper.appendChild(total)
        wrapper.appendChild(fragment);
        if (!cartCount)
            wrapper.textContent = "Cart is empty"
    }

}

customElements.define('list-component', ListComponent)