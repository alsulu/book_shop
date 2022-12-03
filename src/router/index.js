import appConstants from '../common/constants';
import Route from 'route-parser';

import MainPage from '../pages/main.template';
import CartPage from '../pages/cart.template';
import BookPage from '../pages/book.template';
import WishlistPage from '../pages/wishlist.template';
import SearchPage from '../pages/search.template';
import ProfilePage from '../pages/profile.template';

export const routes = {
    Main: new Route(appConstants.routes.index),
    Book: new Route(appConstants.routes.book),
    Search: new Route(appConstants.routes.search),
    Cart: new Route(appConstants.routes.cart),
    Wishlist: new Route(appConstants.routes.wishlist),
    Profile: new Route(appConstants.routes.profile),
}

const routesWithPages = [
    { route: routes.Main, page: MainPage },
    { route: routes.Book, page: BookPage },
    { route: routes.Search, page: SearchPage },
    //{ route: routes.BooksSearch, page: BooksPage },
    { route: routes.Wishlist, page: WishlistPage },
    //{ route: routes.UsersSearch, page: UsersPage },
    { route: routes.Profile, page: ProfilePage },
    { route: routes.Cart, page: CartPage },
]

/*export const render = (path) => {
    let result = "<h1>404 error</h1>";

    if (routes.Main.match(path))
        result = MainPage();
    else if (routes.Book.match(path))
        result = BookPage();
    else if (routes.Search.match(path))
        result = SearchPage();
    else if (routes.Cart.match(path))
        result = CartPage();
    else if (routes.Wishlist.match(path))
        result = WishlistPage();
    else if (routes.Profile.match(path))
        result = ProfilePage();

    document.querySelector("#app").innerHTML = result;
}*/

export const getPathRoute = (path) => {
    const target = routesWithPages.find(r => r.route.match(path))
    if (target) {
        const params = target.route.match(path)
        return {
            page: target.page,
            route: target.route,
            params
        }
    }
    return null
}

export const render = (path) => {
    let result = '<h1>404</h1>'

    const pathRoute = getPathRoute(path)

    if (pathRoute) {
        result = pathRoute.page(pathRoute.params)
    }

    document.querySelector('#app').innerHTML = result
}

export const getRouterParams = () => {
    const url = new URL(window.location.href).pathname
    return getPathRoute(url)
}

export const goTo = (path) => {
    window.history.pushState({path}, path, path)
    render(path);
}

const initRouter = () => {
    window.addEventListener('popstate', e => {
        render( new URL(window.location.href).pathname)
    })
    document.querySelectorAll('[href^="/"]').forEach(el => {
        el.addEventListener('click', (env) => {
            env.preventDefault();
            const {pathname: path} = new URL(env.target.href);
            goTo(path);
        })
    })
    render(new URL(window.location.href).pathname)
}

export default initRouter;