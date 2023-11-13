import { newarr, isLoaded, cartCount, updateCartByUser } from '../common/common';
import { getBook, setBook } from '../service/books';
import { getBooksBySearch, getNewBooks, getBookByISBN } from '../api/booksApi';

class PaginationComponent extends HTMLElement {
    constructor() {
        super();
        this.page = 1;
        this.last = 1;
        const shadow = this.attachShadow({mode: 'open'});

        const pagination = document.createElement('div');
        pagination.setAttribute('class', 'pagination');

        const prevBtn = document.createElement('button');
        prevBtn.setAttribute('class', 'pagination__prev-btn');
        prevBtn.textContent = 'Prev';
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.page > 1) {
                const event = new CustomEvent('back-to-page')
                this.dispatchEvent(event)
            }
        })

        const nextBtn = document.createElement('button');
        nextBtn.setAttribute('class', 'pagination__next-btn');
        nextBtn.textContent = 'Next';
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.page != this.last) {
                const event = new CustomEvent('to-next-page')
                this.dispatchEvent(event)
            }
        })

        const pageNumber = document.createElement('span');
        pageNumber.setAttribute('class', 'pagination__number');
        pageNumber.innerText = `${this.page}/${this.last}`;

        const style = document.createElement('style');
        style.textContent = `
            .pagination__number {
                margin: 0 10px;
            }
        `

        pagination.appendChild(prevBtn);
        pagination.appendChild(pageNumber);
        pagination.appendChild(nextBtn);

        shadow.appendChild(style);
        shadow.appendChild(pagination);
    }

    connectedCallback() {
        const shadow = this.shadowRoot
        const nextBtn = shadow.querySelector('.pagination__next-btn')
        const prevBtn = shadow.querySelector('.pagination__prev-btn')
        const pageNumber = shadow.querySelector('.pagination__number');
        
        if (this.page == 1)
            prevBtn.setAttribute('disabled', true)
        else
            prevBtn.removeAttribute('disabled');

        if (this.page == this.last)
            nextBtn.setAttribute('disabled', true)
        else
            nextBtn.removeAttribute('disabled');

        pageNumber.innerText = `${this.page}/${this.last}`;
    }

    static get observedAttributes() {
        return ['page', 'last']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'page')
            this.page = newValue;
        if (name === 'last')
            this.last = newValue;
        this.connectedCallback(newValue)
    }
}

customElements.define('pagination-component', PaginationComponent)