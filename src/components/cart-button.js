import { newarr, updateCartByUser } from '../common/common';
import { addToCart, updateCart, deleteFromCart } from '../api/cartApi';

class CartButton extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'cart-button-container')
        shadow.appendChild(wrapper);
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const wrapper = shadow.querySelector('.cart-button-container');
        const isAdded = this.getAttribute('isAdded');
        let count = this.getAttribute('count');
        const id = this.getAttribute('id');

        if (isAdded === "true") {
    
            const index = newarr.map(e => e.bookId).indexOf(id);
            const numb = newarr[index].id;
        
            wrapper.innerHTML = `<button class="button-minus">-</button>
                <span>${count}</span>
                <button class="button-plus">+</button>`
        
            const buttonMinus = wrapper.querySelector('.button-minus');
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
                    this.deleteFrom(numb, detail, count)
                }
            })
        
            const buttonPlus = wrapper.querySelector('.button-plus');
            buttonPlus.addEventListener('click', e => {
                e.stopPropagation();
                count++;
                const detail = {"bookId": id, "count": count};
                updateCart(numb, detail);
                this.setAttribute('count', count)
            })
        }
        else {
            wrapper.innerHTML = '<button class="add-to-cart-button">Add To Cart</button>';
            const button = wrapper.querySelector('.add-to-cart-button');
        
            button.addEventListener('click', e => {
                e.stopPropagation();
                count = 1;
                this.addTo(id, count)
            })

        }
    }

    async addTo(id, count) {
        await addToCart({"bookId": id, "count": count});
        await updateCartByUser()
        this.setAttribute('isAdded', true)
        this.setAttribute('count', count)
    }

    async deleteFrom(numb, detail) {
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
}

customElements.define('cart-button', CartButton)