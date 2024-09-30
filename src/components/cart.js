import { formatPrice, insertHTML } from "../helpers.js";

export function createEmptyCart() {
    const div = document.createElement("div");
    div.classList.add("empty-cart");

    insertHTML(
        div,
        "beforeend",
        `
            <img
                src="./assets/images/illustration-empty-cart.svg"
                alt="Illustration of an empty shopping cart"
            />
            <p class="fw-semibold small">
                Your added items will appear here
            </p>
        `
    );
    return div;
}

export function createCartTable(cart) {
    const table = document.createElement("table");
    const tableBody = document.createElement("tbody");
    const tableFoot = document.createElement("tfoot");

    const orderTotal = cart.reduce(
        (acc, current) => acc + current.quantity * current.price,
        0
    );

    cart.forEach(function generateCartItem(item) {
        insertHTML(
            tableBody,
            "beforeend",
            `
            <tr>
                <td>
                    <div>
                        <p class="fw-semibold small">
                           ${item.name} 
                        </p>
                        <span class="fw-semibold red-text small"
                            >${item.quantity}x</span
                        >
                        <span class="rose-500-text small"
                            >@${formatPrice(item.price)}</span
                        >
                        <span
                            class="rose-500-text fw-semibold small"
                            >${formatPrice(item.price * item.quantity)}</span
                        >
                    </div>
                </td>
                <td class="fw-semibold">
                    <button
                        id="removeItem"
                        data-name="${item.name}"
                        class="remove-item"
                        aria-label="Remove item from cart"
                    >
                        <img
                            src="./assets/images/icon-remove-item.svg"
                            alt=""
                            aria-hidden="true"
                        />
                    </button>
                </td>
            </tr>
        `
        );
    });

    insertHTML(
        tableFoot,
        "afterbegin",
        `
            <tr>
                <td class="rose-500-text small">Order Total</td>
                <td class="order-total h4 fw-bold">${formatPrice(
                    orderTotal
                )}</td>
            </tr>
        `
    );

    table.appendChild(tableBody);
    table.appendChild(tableFoot);

    return table;
}

export function createCartHeading(orderCount) {
    const h2 = document.createElement("h2");

    h2.classList.add("h4", "red-text");
    insertHTML(
        h2,
        "afterbegin",
        `
       Your cart (${orderCount})
        `
    );

    return h2;
}

export function createCartFooter() {
    return `
        <p class="info small">
            This is
            <span class="fw-semibold">Carbon-neutral</span> delivery
        </p>
        <button id="confirmOrder" class="order-btn">Confirm Order</button>
    
    `;
}
