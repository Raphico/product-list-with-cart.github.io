import { formatPrice, insertHTML } from "../helpers.js";

export function createDessert(dessert, isDessertInCart, quantity) {
    const article = document.createElement("article");
    article.classList.add("dessert", isDessertInCart && "ordered");
    insertHTML(
        article,
        "afterbegin",
        `
            <picture class="dessert-img">
                <source
                    srcset="${dessert.image.desktop}"
                    alt="${dessert.image.alt}"
                    media="(min-width: 1024px)"
                />
                <source
                    srcset="${dessert.image.tablet}"
                    alt="${dessert.image.alt}"
                    media="(min-width: 768px)"
                />
                <img
                    src="${dessert.image.mobile}"
                    alt="${dessert.image.alt}"
                />
            </picture>
            <div class="product-btn-container">
                ${
                    isDessertInCart
                        ? `
                            <div class="quantity-control">
                                <button
                                    data-name="${dessert.name}"
                                    id="decrementQuantity"
                                    class="quantity-control-decrement"
                                    aria-label="Decrease quantity"
                                >
                                    <img
                                        src="./assets/images/icon-decrement-quantity.svg"
                                        alt=""
                                        aria-hidden="true"
                                    />
                                </button>
                                <span aria-live="polite">${quantity}</span>
                                <button
                                    data-name="${dessert.name}"
                                    id="incrementQuantity"
                                    class="quantity-control-increment"
                                    aria-label="Increase quantity"
                                >
                                    <img
                                        src="./assets/images/icon-increment-quantity.svg"
                                        alt=""
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        `
                        : `
                            <button
                                data-name="${dessert.name}"
                                id="addToCart"
                                class="add-to-cart"
                                aria-label="Add to cart"
                            >
                                <img
                                    src="./assets/images/icon-add-to-cart.svg"
                                    alt=""
                                    aria-hidden="true"
                                />
                                Add to Cart
                            </button>
                        `
                }
            </div>
            <small class="dessert-type rose-500-text">${
                dessert.category
            }</small>
            <h2 class="p fw-semibold">
                <span class="dessert-title"
                    >${dessert.name}</span
                >
                <span class="dessert-price red-text">${formatPrice(
                    dessert.price
                )}</span>
            </h2>
        `
    );
    return article;
}
