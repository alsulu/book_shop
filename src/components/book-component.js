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
            <img class="book-container__cover" alt="book image">
            <h4 class="book-container__title"></h4>
            <p class="book-container__subtitle"></p>
            <p class="book-container__price"></p>
            <div class="book-container__button-container"></div>
        `

        /*const style = document.createElement('style');

        style.textContent = `
        `

        shadow.appendChild(style);*/
        shadow.appendChild(wrapper);
    }
    
    /*connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }*/

    connectedCallback() {
        const shadow = this.shadowRoot;
        const id = this.getAttribute('id');
        let isAdded = this.getAttribute('isAdded') || false;
        //const search = this.getAttribute('search');
        const book = getBook(id);
        let count = this.getAttribute('count') || "0";

        
        //if (book.isbn13 === id) {
            const wrapper = shadow.querySelector('.book-container');
            //console.log(book);

            const cover = shadow.querySelector('.book-container__cover');
            cover.setAttribute('src', book.image);
            const title = shadow.querySelector('.book-container__title');
            title.textContent = book.title;
            const subtitle = shadow.querySelector('.book-container__subtitle');
            subtitle.textContent = book.subtitle;
            const price = shadow.querySelector('.book-container__price');
            price.textContent = book.price;
            
            
            const buttonDiv = shadow.querySelector('.book-container__button-container');
            
            if (isAdded === "true") {

                const index = newarr.map(e => e.bookId).indexOf(book.isbn13);
                const numb = newarr[index].id;

                buttonDiv.innerHTML = `<button class="book-container__button-container__button-minus">-</button>
                    <span>${count}</span>
                    <button class="book-container__button-container__button-plus">+</button>`


                const buttonMinus = buttonDiv.querySelector('.book-container__button-container__button-minus');
                buttonMinus.addEventListener('click', e => {
                    e.stopPropagation();
                    count--;
                    if (count > 0) {
                        const detail = {"bookId": id, "count": count}
                        updateCart(numb, detail);
                        this.setAttribute('count', count)
                    }
                    else {
                        const detail = {"bookId": id, "count": count+1}
                        //deleteFromCart(numb, detail);
                        this.deleteFrom(numb, detail, count)
                    }
                })

                const buttonPlus = buttonDiv.querySelector('.book-container__button-container__button-plus');
                buttonPlus.addEventListener('click', e => {
                    e.stopPropagation();
                    count++;
                    const detail = {"bookId": id, "count": count};
                    updateCart(numb, detail);
                    this.setAttribute('count', count)
                })
            }
            else {
                buttonDiv.innerHTML = '<button class="book-container__button-container__button"></button>';
                const button = buttonDiv.querySelector('.book-container__button-container__button');
                button.innerText = "Add To Cart";

                button.addEventListener('click', e => {
                    e.stopPropagation();
                    count = 1;
                    this.addTo(id, count)
                    //addToCart({"bookId": id, "count": count});
                    /*this.setAttribute('isAdded', true)
                    this.setAttribute('count', count)*/
                })
            }
            
            wrapper.addEventListener('click', (e) => {
                e.stopPropagation()
                const url = routes.Book.reverse({book: id})
                goTo(url)
            })
        //}
    }
    async addTo(id, count) {
        await addToCart({"bookId": id, "count": count});
        await updateCartByUser()
        this.setAttribute('isAdded', true)
        this.setAttribute('count', count)
    }

    async deleteFrom(numb, detail, count) {
        await deleteFromCart(numb, detail);
        await updateCartByUser()
        this.setAttribute('isAdded', false)
        this.setAttribute('count', 0)
    }

    static get observedAttributes() {
        return ['isAdded', 'count']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.connectedCallback()
    }

    /*updateBook(book) {
        const shadow = this.shadowRoot;
    
        const title = shadow.querySelector('.book-container__title');
        title.textContent = book.title;
        const author = shadow.querySelector('.book-container__author')
        author.textContent = book.authors;
        const price = shadow.querySelector('.book-container__price');
        price.textContent = book.price;
        const descripion = shadow.querySelector('.book-container__descripion');
        descripion.textContent = book.desc;
        const publisher = shadow.querySelector('.book-container__publisher');
        publisher.textContent = "Publisher:" + book.publisher;
        const isbn13 = shadow.querySelector('.book-container__isbn13');
        isbn13.textContent = "ISBN13:" + book.isbn13;

        const cover = shadow.querySelector('.book-container__cover');
        cover.setAttribute('src', book.image);
        const cart = document.querySelector('.book-container__cart-btn');
        cart.setAttribute('data-art', book.isbn13);
        const wishlist = document.querySelector('.book-container__wishlist-btn');
        wishlist.setAttribute('data-art', book.isbn13);
        
        const similar = shadow.querySelector('.book-container__similar__content');
        getBooksBySearch(book.desc)
            .then((books) => {
                const fragment = document.createDocumentFragment();
                books.array.forEach(el => {
                    if (!getBook(el.isbn13))
                        setBook(el);

                    const div = document.createElement(div);
                    div.innerHTML = `
                        <img class="book-container__similar__content__cover" src="${el.image}" alt="similar book">
                        <h4 class="book-container__similar__content__title">${el.title}</h4>
                        <p class="book-container__similar__content__subtitle">${el.subtitle}</p>
                        <p class="book-container__similar__content__price">${el.price}</p>
                    `;
                    fragment.appendChild(div);
                })
                similar.appendChild(fragment)
            })
            .catch(error => console.log(error))
    }
    */

}

customElements.define('book-component', BookComponent)