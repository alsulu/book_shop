import appConstants from '../common/constants';
//import { render } from '../router';
import { goTo, routes } from '../router';
import { getBook, setBook } from '../service/books';

class CartComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'cart-container');

        wrapper.innerHTML = `
            
        `

        /*const style = document.createElement('style');

        style.textContent = `
        `

        shadow.appendChild(style);*/
        shadow.appendChild(wrapper);
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const id = this.getAttribute('id');
        //const search = this.getAttribute('search');
        const book = getBook(id);
        
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
            
            wrapper.addEventListener('click', (e) => {
                e.stopPropagation()
                const url = routes.Book.reverse({book: id})
                goTo(url)
            })
        //}
    }

}

customElements.define('cart-component', CartComponent)