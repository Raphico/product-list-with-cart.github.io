import { formatPrice, insertHTML } from "../helpers.js";

export function createCheckoutHeader() {
    const img = document.createElement("img");
    img.setAttribute("src", "./assets/images/icon-order-confirmed.svg");
    img.setAttribute("alt", "");
    img.setAttribute("aria-hidden", "true");

    const header = document.createElement("header");
    insertHTML(
        header,
        "afterbegin",
        `
        <h2 class="h1">Order Confirmed</h2>
        <p class="rose-500-text">We hope you enjoy your food</p>
        `
    );

    return [img, header];
}

export function createOrderTable(cart) {
    const table = document.createElement("table");
    const tableBody = document.createElement("tbody");
    const tableFoot = document.createElement("tfoot");

    const orderTotal = cart.reduce(
        (acc, current) => acc + current.quantity * current.price,
        0
    );

    table.classList.add("checkout-table");

    cart.forEach(function generateCartItem(item) {
        insertHTML(
            tableBody,
            "beforeend",
            `
            <tr>
                <td>
                    <div class="thumbnail-container">
                        <img
                            src="${item.image.thumbnail}"
                            alt="${item.image.alt}"
                        />
                    </div>
                    <div class="order-info">
                        <p class="fw-semibold small">
                           ${item.name} 
                        </p>
                        <span class="fw-semibold red-text small"
                            >${item.quantity}x</span
                        >
                        <span class="rose-500-text small"
                            >@${formatPrice(item.price)}</span
                        >
                    </div>
                </td>
                <td class="fw-semibold">
                    ${formatPrice(item.quantity * item.price)}
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

export function createNewOrderBtn() {
    const button = document.createElement("button");
    button.classList.add("order-btn");
    button.id = "orderBtn";
    button.textContent = "Start New Order";

    return button;
}
