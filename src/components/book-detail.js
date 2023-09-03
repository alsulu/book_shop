import appConstants from '../common/constants';
import { cartData } from '../common/common';
//import { render } from '../router'; 
import { goTo } from '../router';
import { getBook, setBook } from '../service/books';
import {getBookByISBN} from '../api/booksApi';
import { getCartByUser, addToCart, updateCart } from '../api/cartApi';


class BookDetail extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'book-detail');
        this.isClicked = false;

        wrapper.innerHTML = `
            <div class="book-detail__container">
                <img class="book-detail__container__cover" alt="book image">
                <h2 class="book-detail__container__title"></h2>
                <p class="book-detail__container__author"></p>
                <p class="book-detail__container__price"></p>
                <p class="book-detail__container__description"></p>
                <button class="book-detail__container__cart-btn">Add to Cart</button>
                <button class="book-detail__container__updCart-btn">Update Cart</button>
                <button class="book-detail__container__wishlist-btn">Wishlist</button>
                <p class="book-detail__container__publisher"></p>
                <p class="book-detail__container__isbn13"></p>
            </div>
            <list-component class="similars" title="Similar" list-type="book"></list-component>
        `

        /*const style = document.createElement('style');

        style.textContent = `
        `

        shadow.appendChild(style);*/
        shadow.appendChild(wrapper);
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const id = this.getAttribute('book');
        //const search = this.getAttribute('search');
        const book = getBook(id);

        /*if (book) {
            this.updateBook(book)
        } else {*/
            getBookByISBN(id)
                .then((book) => {
                    setBook(book);
                    this.updateBook(book);
                })
                .catch(error => console.log(error))
        //}

    }

    /*updateCart() {
        let count;
        let cartId;
        getCartByUser(1)
            .then(data => {
                console.log(data); 
                data.forEach(el=> {if (el.bookId === id) {
                    cart.innerText = "Added"
                    cart.setAttribute("disabled", true)
                    count = el.count || 1
                    cartId = el.id || data.length
                }})
            })
            .catch (err => console.log(err.message))
    }

    static get observedAttributes() {
        return ['isClicked']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateCart()
    }*/

    updateBook(book) {
        const shadow = this.shadowRoot;
        const similar = shadow.querySelector('.similars');
        const id = this.getAttribute('book');
        similar.setAttribute('id', id)
        console.log(similar);
        similar.setAttribute('search', book.title)
    
        const title = shadow.querySelector('.book-detail__container__title');
        title.textContent = book.title;
        const author = shadow.querySelector('.book-detail__container__author')
        author.textContent = book.authors;
        const price = shadow.querySelector('.book-detail__container__price');
        price.textContent = book.price;
        const descripion = shadow.querySelector('.book-detail__container__description');
        descripion.textContent = book.desc;
        const publisher = shadow.querySelector('.book-detail__container__publisher');
        publisher.textContent = "Publisher:" + book.publisher;
        const isbn13 = shadow.querySelector('.book-detail__container__isbn13');
        isbn13.textContent = "ISBN13:" + book.isbn13;

        const cover = shadow.querySelector('.book-detail__container__cover');
        cover.setAttribute('src', book.image);
        const cart = shadow.querySelector('.book-detail__container__cart-btn');
        cart.setAttribute('data-art', book.isbn13);
        const wishlist = shadow.querySelector('.book-detail__container__wishlist-btn');
        wishlist.setAttribute('data-art', book.isbn13);

        const updCart = shadow.querySelector('.book-detail__container__updCart-btn');
        updCart.setAttribute('data-art', book.isbn13);

        let count = 1;
        let cartId;
        console.log('cartData', cartData)

        cartData.forEach(el => {
            if (el.bookId === id) {
                cart.innerText = "Added"
                cart.setAttribute("disabled", true)
                count = el.count
                cartId = el.id || cartData.length+1
            }
        })

        const detail = {"bookId": id, "count": count, "userId": 1}
        console.log('detail', detail)
        cart.addEventListener('click', e => {
            e.stopPropagation()
            addToCart(detail)
            cart.innerText = "Added"
            cart.setAttribute("disabled", true)
            this.isClicked = true
            //this.updateBook()
            cartData.push(detail)
        })

        /*updCart.addEventListener('click', e => {
            e.stopPropagation()
            count++
            console.log(count)
            //addToCart({"id": cartId, "count": count})
            updateCart(cartId, detail)
            cartData.forEach(el => el.bookId === id && el.count++)
        })

        
        /*const similar = shadow.querySelector('.book-detail__similar');
        const similarList = document.createElement('list-component');
        getBooksBySearch(book.desc)
            .then((books) => {
                const fragment = document.createDocumentFragment();
                books.array.forEach(el => {
                    if (!getBook(el.isbn13))
                        setBook(el);

                    const div = document.createElement(div);
                    //div.innerHTML = `
                        <img class="book-container__similar__content__cover" src="${el.image}" alt="similar book">
                        <h4 class="book-container__similar__content__title">${el.title}</h4>
                        <p class="book-container__similar__content__subtitle">${el.subtitle}</p>
                        <p class="book-container__similar__content__price">${el.price}</p>
                    //`;
                    fragment.appendChild(div);
                })
                similarList.appendChild(fragment);
            })
            .catch(error => console.log(error))
        similar.appendChild(similarList);*/
    }

}

customElements.define('book-detail', BookDetail)