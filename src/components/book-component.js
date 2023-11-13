import { BooksApi } from '../api';
import appConstants from '../common/constants';
//import { render } from '../router';
import { goTo, routes } from '../router';
import { getBook, setBook } from '../service/books';
import { newarr, isLoaded, updateCartByUser } from '../common/common';
import { getCartByUser, addToCart, updateCart, deleteFromCart } from '../api/cartApi';

class BookComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'book-container');

        wrapper.innerHTML = `
            <img class="book-container__cover" alt="book image" />
            <h4 class="book-container__title"></h4>
            <p class="book-container__subtitle"></p>
            <p class="book-container__price"></p>
            <div class="book-container__button-container"></div>
        `

        shadow.appendChild(wrapper);
    }
    

    connectedCallback() {
        const shadow = this.shadowRoot;
        const id = this.getAttribute('id');
        let isAdded = this.getAttribute('isAdded') || false;
        const book = getBook(id);
        const ifCart = this.getAttribute('ifCart') || false;
        
        let count = this.getAttribute('count') || "0";

        
        const wrapper = shadow.querySelector('.book-container');
        const cover = shadow.querySelector('.book-container__cover');
        cover.src = book.image;
        const title = shadow.querySelector('.book-container__title');
        title.textContent = book.title;
        const subtitle = shadow.querySelector('.book-container__subtitle');
        subtitle.textContent = book.subtitle;
        const price = shadow.querySelector('.book-container__price');

        if (ifCart) {
            const pricePerPiece = book.price.slice(1);
            price.textContent = "$" + (+pricePerPiece * +count).toFixed(2);
        }
        else
            price.textContent = book.price;
        
        
        const buttonDiv = shadow.querySelector('.book-container__button-container');
        
        const cartButton = document.createElement('cart-button');
        cartButton.setAttribute('count', count);
        cartButton.setAttribute('id', book.isbn13);
        cartButton.setAttribute('isAdded', isAdded);

        buttonDiv.appendChild(cartButton);
        
        wrapper.addEventListener('click', (e) => {
            e.stopPropagation()
            const url = routes.Book.reverse({book: id})
            goTo(url)
        })
    }

}

customElements.define('book-component', BookComponent)