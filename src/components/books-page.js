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

        if (typeBook === 'book')
            this.getBooksPage();
        if (typeList === 'user')
            this.getUsersPage();

        wrapper.appendChild(fragment);
    }

}

customElements.define('books-page', BooksPage)