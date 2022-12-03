document.addEventListener("DOMContentLoaded", function(event) {
    checkCart();
    bookLoad()
})

function bookLoad() {
    const books = JSON.parse(booksJson);
    let out = "";
    out =  `<div class="wrapper__container-1__pic-box">
        <img class="wrapper__container-1__pic-box__book-1" src=${books[0].cover} alt="main_wrapper">
    </div>
    <div>
        <h2 class="wrapper__container-1__text-book-title">${books[0].title}</h2>
    </div>
    <div>
        <p class="wrapper__container-1__text-author">${books[0].author}</p>
    </div>
    <div>
        <p class="wrapper__container-1__text-edition">Paperback | 2nd Edition</p>
    </div>
    <div>
        <h2 class="wrapper__container-1__text-price">€${books[0].price}</h2>
    </div>
    <div class="wrapper__container-1__text-about">
        <p>${books[0].description} <a class="wrapper__container-1__text-about__link" href="...">read more</a></p>
    </div>`
    document.getElementsByClassName("wrapper__container-1")[0].innerHTML = out;
    out = `<button class="wrapper__container-2__btn-add-to-cart" data-art="0">Add to Cart</button>`;
    document.getElementsByClassName("wrapper__container-2__btn-cart")[0].innerHTML = out;

    document.getElementsByClassName("wrapper__container-2__btn-add-to-cart")[0].onclick = addToCart;
}

let cart = [];
let many = 0;

function addToCart() {
    let articul = this.dataset.art;
    if (cart[articul])
        cart[articul]++;
    else
        cart[articul] = 1;
    localStorage.setItem("cart", JSON.stringify(cart));

    many++;
    document.getElementById("mini-cart").innerHTML = many;
}

function checkCart() {
    let localCart = localStorage.getItem("cart");
    if (localCart) {
        cart = JSON.parse(localCart);
        for (let good of cart) 
            many += good;
        document.getElementById("mini-cart").innerHTML = many;
    }
}