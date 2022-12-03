import appConstants from '../common/constants';
//import { render } from '../router';
import { goTo } from '../router';

class UserAvatar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('img');
        wrapper.setAttribute('class', 'user-avatar');

        const name = document.createElement('p');
        name.setAttribute('class', 'avatar-name');

        const style = document.createElement('style');

        style.textContent = `
            .user-avatar {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: red;
            }
            .user-avatar.small {
                width: 10px;
                height: 10px;
            }
        `

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        shadow.appendChild(name);
    }

    connectedCallback() {
        this.updateElement()
    }

    onClick = (e) => {
        e.preventDefault();
        if (!this.selected) {
            const { pathname: path } = new URL(e.target.href);
            /*window.history.pushState({path}, path, path);
            render(path);*/
            goTo(path);
        }
    }

    static get observedAttributes() {
        return ['user-name', 'small'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateElement()
    }

    updateElement() {
        const shadow = this.shadowRoot;

        const userName = this.getAttribute('user-name');
        const small = this.getAttribute('small');

        const avatar = this.querySelector('.user-avatar');
        const name = this.querySelector('.avatar-name')

        if (small) {
            avatar.setAttribute('class', ' user-avatar small')
        } else {
            avatar.setAttribute('class', ' user-avatar')
        }

        if (userName) {
            name.textContent = userName;
        }
    }
}

customElements.define('user-avatar', UserAvatar)