export function insertHTML(el, position = "afterbegin", htmlContent) {
    el.insertAdjacentHTML(position, htmlContent);
}

export function delegate(parentEl, targetId, event, handler) {
    parentEl.addEventListener(event, (e) => {
        if (e.target.id === targetId) {
            handler(e);
        }
    });
}

export function formatPrice(price) {
    return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "USD",
    }).format(price);
}
