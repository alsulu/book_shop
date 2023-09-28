import appConstants from '../common/constants';
import { newarr, isLoaded, cartCount, updateCartByUser } from '../common/common';
import { goTo, routes } from '../router';

class NavComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');

        wrapper.setAttribute('class', 'main-menu');
        this.links = [
            {href: appConstants.routes.index, name: 'home', class: 'home-link'},
            {href: appConstants.routes.cart, name: 'cart', class: 'cart-link'},
            //{href: appConstants.routes.wishlist, name: 'wishlist', class: 'wishlist-link'},
            //{href: appConstants.routes.profile, name: 'profile', class: 'profile-link'}
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
    }

    async connectedCallback () {
        const shadow = this.shadowRoot;
        const searchText = this.getAttribute('search');

        if (searchText) {
            const input = shadow.querySelector('input');
            input.value = searchText;
        }

        const {pathname: path} = new URL(window.location.href);
    }

    static get observedAttributes() {
        return ['search']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'search') {
            this.updateSearch()
        }
    }
}

customElements.define('main-nav', NavComponent)