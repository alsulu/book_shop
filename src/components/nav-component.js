import appConstants from '../common/constants';
//import { render } from '../router';
import { goTo, routes } from '../router';

class NavComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');
        //this.searchType = appConstants.search.types.book;

        wrapper.setAttribute('class', 'main-menu');
        this.links = [
            {href: appConstants.routes.index, name: 'home', class: 'home-link'},
            {href: appConstants.routes.book, name: 'Book', class: 'book-link'},
            {href: appConstants.routes.wishlist, name: 'wishlist', class: 'wishlist-link'},
            {href: appConstants.routes.profile, name: 'profile', class: 'profile-link'},
        ]

        const style = document.createElement('style');

        style.textContent = `
            .main-menu {
                display: flex;
                align-items: center;
                padding: 5px;
            } 

            .global-search {
                font-size: 1am;
                border: 1px solid #ccc;
                border-radius: 8px;
                padding: 4px 20px;
                width: 100%;
                margin: 0 50px;
            }

            .global-search:placeholder {
                color: #aaa;
            }
        `

        shadow.appendChild(style);
        shadow.appendChild(wrapper);

        const fragment = document.createDocumentFragment();
        this.links.forEach(link => {
            const l = document.createElement('nav-link');
            l.setAttribute('class', `main-link ${link.class}`);
            l.setAttribute('href', link.href);
            l.setAttribute('text', link.name);
            fragment.appendChild(l);
        })
        wrapper.appendChild(fragment);

        const select = document.createElement('select');
        select.setAttribute('class', 'select');
        select.innerHTML = `
            <option selected value="books">Books</option>
            <option value="users">Users</option>
        `;

        const search = document.createElement('input');
        search.setAttribute('class', 'global-search');
        search.addEventListener('keyup', (e) => {
            e.stopPropagation;
            if (e.key === 'Enter') {
                e.preventDefault();
                const text = e.target.value;
                const url = routes.Search.reverse({search: text});
                goTo(url);
            }
        })

        wrapper.appendChild(search)
    }

    updateSearch() {
        const shadow = this.shadowRoot;
        const input = shadow.querySelector('input');
        const search = this.getAttribute('search');
        input.value = search;
        if (this.searchType === "book")
            input.setAttribute('placeholder', 'Search book...')
        else if (this.searchType === "user")
            input.setAttribute('placeholder', 'Search user...')
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const searchText = this.getAttribute('search');
        this.searchType = this.getAttribute('type') ? this.getAttribute('type') : appConstants.search.types.book;

        if (searchText) {
            const input = shadow.querySelector('input');
            input.value = searchText;
        }

        const {pathname: path} = new URL(window.location.href);
        const  link = this.links.find(l => l.href == path);

        if (link) {
            const linkElement = shadow.querySelector(`.${link.class}`);
            linkElement.setAttribute('selected', true)
        }
    }

    static get observedAttributes() {
        return ['search', 'type']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'search') {
            this.updateSearch()
        }

        if (name === 'type') {
            this.searchType = newValue;
            this.updateSearch();
        }
    }
}

customElements.define('main-nav', NavComponent)