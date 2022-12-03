document.addEventListener("DOMContentLoaded", function(event) {
    newBooksLoad();
    checkCart();
})

function newBooksLoad() {
    const books = JSON.parse(booksJson);
    fetch('https://api.itbook.store/1.0/new')
        .then(response => response.json())
        .then(content => {
            let out = "";
            for (let book of content.books) {
                out += `<div class="book-item"><a class="book-1" href="book_page.html">
                            <img class="book-item__image" src="${book.image}" alt="book image">
                            <div class="book-item__title"> ${book.title}</div>
                            <div class="book-item__subtitle">${book.subtitle}</div></a>
                            <button class="btn-cart" data-art="${book.isbn13}" onclick="addToCart(this)">Add to cart</button>
                        </div>`;
            }
            document.getElementsByClassName("arrivals__list")[0].innerHTML = out;
        })

}

/*
out += `<div class="book-item">` + ((!book.url) ? `` : `<a class="book-1" href="${book.url}">`) +
                    `<div class="book-item__icon"> <img src="${book.cover}"> </div>
                    <div class="book-item__name"> ${book.title}</div>
                    <div class="book-item__author">${book.author}</div>`
                    + ((!book.url) ? `` : `</a>`) + 
                    `<button class="btn-cart" data-art="${book.id}" onclick="addToCart(this)">Add to cart</button>
                </div>`;
*/

let cart = [];
let many = 0;

function addToCart(sender) {
    let articul = Number(sender.dataset.art);
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