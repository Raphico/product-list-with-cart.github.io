class Store {
    static #instance;
    #desserts = [];
    #cart = [];
    #observers = [];

    constructor() {
        if (Store.#instance) {
            return Store.#instance;
        }

        Store.#instance = this;
    }

    getDesserts() {
        return this.#desserts;
    }

    getDessert(dessertName) {
        return this.#desserts.find((dessert) => dessert.name == dessertName);
    }

    getCart() {
        return this.#cart;
    }

    loadDesserts(desserts) {
        this.#desserts = desserts;
    }

    subscribe(observer) {
        this.#observers = [...this.#observers, observer];
    }

    clearCart() {
        this.#cart = [];

        this.notify(this.#cart);
    }

    addToCart(dessert) {
        this.#cart = [
            ...this.#cart,
            {
                ...dessert,
                quantity: 1,
            },
        ];

        this.notify(this.#cart);
    }

    removeDessertFromCart(dessertName) {
        this.#cart = this.#cart.filter(
            (dessert) => dessert.name != dessertName
        );

        this.notify(this.#cart);
    }

    incrementDessert(dessertName) {
        this.#cart = this.#cart.map(function updateCart(d) {
            return dessertName == d.name
                ? { ...d, quantity: d.quantity + 1 }
                : d;
        });

        this.notify(this.#cart);
    }

    decrementDessert(dessertName) {
        const dessert = this.#cart.find(function findDessert(dessert) {
            return dessert.name == dessertName;
        });

        if (dessert.quantity - 1 == 0) {
            this.removeDessertFromCart(dessertName);
            return;
        }

        this.#cart = this.#cart.map(function updateCart(d) {
            return dessertName == d.name
                ? { ...d, quantity: d.quantity - 1 }
                : d;
        });

        this.notify(this.#cart);
    }

    notify(data) {
        this.#observers.forEach(function notifySubscribers(observer) {
            observer(data);
        });
    }
}

export default new Store();
