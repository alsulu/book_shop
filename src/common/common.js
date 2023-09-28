import { getCartByUser, addToCart, updateCart } from '../api/cartApi';

let newarr;
let cartCount;
let cartData = [];
let isLoaded;

const updateCartByUser = async() => {
    newarr = [];
    isLoaded = false;
    await getCartByUser()
            .then(data => {
                cartCount = 0;
                data.forEach(el => {
                    newarr.push({"bookId": el.bookId, "id": el.id, "count": el.count})
                    cartCount++
                })
                cartData = [...data]
            })
            .catch (err => console.log(err.message))
    isLoaded = true;
    }

export {newarr, cartCount, cartData, isLoaded, updateCartByUser};