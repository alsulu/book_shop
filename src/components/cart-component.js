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

        const title = document.createElement('h2');
        title.innerText = "Cart";
        shadow.appendChild(title);

        /*const style = document.createElement('style');

        style.textContent = `
        `

        shadow.appendChild(style);*/
        shadow.appendChild(wrapper);
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const id = this.getAttribute('id');
        const book = getBook(id);
        
        const bookFromCart = document.createElement('book-componponent')
        //}
    }

}

customElements.define('cart-component', CartComponent)