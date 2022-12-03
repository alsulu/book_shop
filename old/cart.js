document.addEventListener("DOMContentLoaded", function(event) {
    checkCart();
    checkOrders();
    cartLoad();
})

let books = JSON.parse(booksJson);
let cart = [];
let many = 0;
let price = [];
let sum = 0;
const orderDiv = document.getElementsByClassName("order")[0];

function checkCart() {
    let localCart = localStorage.getItem("cart");
    if (localCart) {
        cart = JSON.parse(localCart);
        for (let good of cart) 
            many += good;
        document.getElementById("mini-cart").innerHTML = many;
    }
}

function cartLoad() {
    let out = "";
    for (let book of books) {
        if (cart[book.id]) {
            price[book.id] = +book.price * +cart[book.id];
            sum += price[book.id];
            out += `<div class="order_container" id="${book.id}">
                <img src=${book.cover} class="order_container__cover">
                <h2 class="order_container__title">${book.title}</h2>
                <p class="order_container__author">${book.author}</p>
                <div class="order_container__count">
                <button class="btn-sub" data-art="${book.id}" onclick="btnSub(this)">-</button>
                <span id="number-order-${book.id}">${cart[book.id]}</span>
                <button class="btn-sum" data-art="${book.id}" onclick="btnSum(this)">+</button>
                </div>
                <p class="price" id="price-${book.id}">€${price[book.id].toFixed(2)}</p>
                </div>`
        }
    }
    if (sum) {
        orderDiv.innerHTML = out;
        orderDiv.innerHTML += `<p id="sum-p">К оплате: €<span id="sum">${sum}</span></p>`;
        document.getElementById("checkout").hidden = false;
    }
}

function btnSub(sender) {
    let articul = Number(sender.dataset.art);
    cart[articul]--;
    price[articul] -= +books[articul].price;
    sum -= +books[articul].price;
    many--;
    showOrder(articul);
    if (cart[articul] === 0) {
        document.getElementById(articul).hidden = true;
        checkOrders();
    }
}

function btnSum(sender) {
    let articul = Number(sender.dataset.art);
    cart[articul]++;
    price[articul] += +books[articul].price;
    sum += +books[articul].price;
    many++;
    showOrder(articul);
}

function showOrder(articul) {
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("number-order-" + articul).innerHTML = cart[articul];
    document.getElementById("price-" + articul).innerHTML = "€" + price[articul].toFixed(2);
    document.getElementById("mini-cart").innerHTML = many;
    document.getElementById("sum").innerHTML = sum.toFixed(2);
}

function checkOrders() {
    if (!many) {
        orderDiv.innerHTML = `<p>Вы пока не добавили ни одного товара</p>`;
        document.getElementById("checkout").hidden = true;
    }
}