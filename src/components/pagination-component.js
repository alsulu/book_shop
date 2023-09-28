class PaginationComponent extends HTMLElement {
    constructor(){
        super()
        this.page = 1;
        this.lastPage = false;
        const shadow = this.attachShadow({mode: 'open'})

        const pagination = document.createElement('div')
        pagination.setAttribute('class', 'pagination')

        const prevBtn = document.createElement('button');
        prevBtn.setAttribute('class', 'pagination__prev-btn');
        prevBtn.textContent = 'Prev';
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.page > 1) {
                
            }
        })
    }
}

customElements.define('pagination-component', PaginationComponent)