import { fetchDesserts } from "./services/api.js";
import Store from "./services/store.js";

import { createDessert } from "./components/desserts.js";
import {
    createCartFooter,
    createCartHeading,
    createCartTable,
    createEmptyCart,
} from "./components/cart.js";
import {
    createCheckoutHeader,
    createNewOrderBtn,
    createOrderTable,
} from "./components/order.js";

import { delegate, insertHTML } from "./helpers.js";

const $ = {
    desserts: document.getElementById("desserts"),
    cart: document.getElementById("cart"),
    dialog: document.getElementById("dialog"),
    checkout: document.getElementById("checkout"),
};

window.addEventListener("DOMContentLoaded", async function App() {
    await initApp();
});

async function initApp() {
    const desserts = await fetchDesserts();
    Store.loadDesserts(desserts);
    displayDesserts();
    bindAppEvents();
    subscribeObservers();
}

function displayDesserts(cart) {
    const dessertsMarkup = Store.getDesserts().map(generateDessertItem);

    $.desserts.replaceChildren(...dessertsMarkup);

    function generateDessertItem(dessert) {
        const isDessertInCart =
            cart?.find((d) => d.name == dessert.name) ?? false;
        const quantity = isDessertInCart ? isDessertInCart.quantity : 0;

        return createDessert(dessert, isDessertInCart, quantity);
    }
}

function bindAppEvents() {
    dessertsEvents("click", "addToCart", function addDesertToCart(dessert) {
        Store.addToCart(dessert);
    });

    dessertsEvents(
        "click",
        "decrementQuantity",
        function decrementDessertQuantity(dessertName) {
            Store.decrementDessert(dessertName);
        }
    );

    dessertsEvents(
        "click",
        "incrementQuantity",
        function incrementDessertQuantity(dessertName) {
            Store.incrementDessert(dessertName);
        }
    );

    cartEvents(
        "click",
        "removeItem",
        function removeDessertFromCart(dessertName) {
            Store.removeDessertFromCart(dessertName);
        }
    );

    cartEvents("click", "confirmOrder", function handleConfirmOrder() {
        $.checkout.replaceChildren(
            ...createCheckoutHeader(),
            createOrderTable(Store.getCart()),
            createNewOrderBtn()
        );
        $.dialog.dataset.visible = "true";
        $.checkout.lastChild.addEventListener("click", resetApp);
    });
}

function subscribeObservers() {
    Store.subscribe(displayCartItems);
    Store.subscribe(displayDesserts);
}

function dessertsEvents(event, targetId, handler) {
    delegate($.desserts, targetId, event, (e) => {
        let dessertName = e.target.dataset.name;
        if (
            targetId == "decrementQuantity" ||
            targetId == "incrementQuantity"
        ) {
            handler(dessertName);
            return;
        }
        handler(Store.getDessert(dessertName));
    });
}

function cartEvents(event, targetId, handler) {
    delegate($.cart, targetId, event, (e) => {
        if (targetId == "confirmOrder") {
            handler();
            return;
        }
        let dessertName = e.target.dataset.name;
        handler(dessertName);
    });
}

function displayCartItems(cart) {
    if (cart.length == 0) {
        $.cart.replaceChildren(createEmptyCart());
        $.cart.insertBefore(createCartHeading(0), $.cart.firstChild);
        return;
    }

    $.cart.replaceChildren(createCartTable(cart));
    $.cart.insertBefore(createCartHeading(cart.length), $.cart.firstChild);
    insertHTML($.cart, "beforeend", createCartFooter());
}

function resetApp() {
    Store.clearCart();
    $.dialog.dataset.visible = "false";
}
