import { setBook } from '../service/books';
import { newarr, isLoaded } from '../common/common';
import {getBookByISBN} from '../api/booksApi';


class BookDetail extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'book-detail');

        wrapper.innerHTML = `
            <div class="book-detail-container">
                <img class="book-detail-container__cover" alt="book image">
                <h2 class="book-detail-container__title"></h2>
                <p class="book-detail-container__author"></p>
                <p class="book-detail-container__price"></p>
                <p class="book-detail-container__description"></p>
                <div class="book-detail-container__button-container"></div>
                <p class="book-detail-container__publisher"></p>
                <p class="book-detail-container__isbn13"></p>
            </div>
            <list-component class="similars" title="Similar" list-type="book"></list-component>
        `


        shadow.appendChild(wrapper);
    }

    async connectedCallback() {
        const shadow = this.shadowRoot;
        const bookIsbn = this.getAttribute('book');
        await getBookByISBN(bookIsbn)
            .then((book) => {
                setBook(book);
                this.updateBook(book);
            })
            .catch(error => console.log(error))
    }


    async updateBook(book) {
        const shadow = this.shadowRoot;
        const id = this.getAttribute('book');
        const similar = shadow.querySelector('.similars');
        similar.setAttribute('id', id)
        similar.setAttribute('search', book.title)
    
        const title = shadow.querySelector('.book-detail-container__title');
        title.textContent = book.title;
        const author = shadow.querySelector('.book-detail-container__author')
        author.textContent = book.authors;
        const price = shadow.querySelector('.book-detail-container__price');
        price.textContent = book.price;
        const descripion = shadow.querySelector('.book-detail-container__description');
        descripion.textContent = book.desc;
        const publisher = shadow.querySelector('.book-detail-container__publisher');
        publisher.textContent = "Publisher:" + book.publisher;
        const isbn13 = shadow.querySelector('.book-detail-container__isbn13');
        isbn13.textContent = "ISBN13:" + book.isbn13;
        const cover = shadow.querySelector('.book-detail-container__cover');
        cover.setAttribute('src', book.image);


        const buttonDiv = shadow.querySelector('.book-detail-container__button-container');
        if (isLoaded) {
            let count = "0";
            let isAdded = false;
            const index = newarr.map(e => e.bookId).indexOf(book.isbn13);
            if (index >= 0) {
                count = newarr[index].count;
                isAdded = true;
            }

            const cartButton = document.createElement('cart-button');
            cartButton.setAttribute('count', count);
            cartButton.setAttribute('id', book.isbn13);
            cartButton.setAttribute('isAdded', isAdded);
    
            buttonDiv.appendChild(cartButton);
        }
    }

}

customElements.define('book-detail', BookDetail)