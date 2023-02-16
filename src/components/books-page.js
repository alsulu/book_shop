import { BooksApi } from '../api';
import appConstants from '../common/constants';
//import { render } from '../router';
import { goTo, routes } from '../router';
import { getBook, setBook } from '../service/books';
import { getCartByUser, addToCart } from '../api/cartApi';

class BooksPage extends HTMLElement {
    constructor() {
        super();
        this.page = '';
        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'books-page');

        shadow.appendChild(wrapper);
    }
    
    connectedCallback() {
        this.updatePage();
    }

    static get observedAttributes() {
        return ['page-type']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updatePage()
    }

    updatePage() {
        const shadow = this.shadowRoot;
        const typePage = this.getAttribute('page-type');
        const wrapper = shadow.querySelector('books-page');
        const fragment = document.createDocumentFragment();

        const booksType = document.createElement('book-detail')
        /*if (typeList)
            this.typeList = typeList;
            
        if (this.typeList === appConstants.lists.types.book*/

        if (typeBook === 'book')
            this.getBooksPage();
        if (typeList === 'user')
            this.getUsersPage();

        wrapper.appendChild(fragment);
    }

}

customElements.define('books-page', BooksPage)