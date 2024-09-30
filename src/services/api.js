const URL = "../data.json";

export async function fetchDesserts() {
    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error("Unable to get desserts.");
        }

        const desserts = await response.json();
        return desserts;
    } catch (error) {
        return [];
    }
}
