import { getCartByUser, addToCart, updateCart } from '../api/cartApi';

let newarr = [];
let cartCount;
let cartData = [];
let isLoaded = false;

getCartByUser(1)
            .then(data => {
                cartCount = 0;
                console.log('data', data);
                data.forEach(el => {
                    newarr.push(el.bookId)
                    cartCount++
                })
                cartData = [...data]
                isLoaded = true;
            })
            .catch (err => console.log(err.message))

export {newarr, cartCount, cartData, isLoaded};