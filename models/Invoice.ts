export type Invoice = {
    id: string,
    amount_subtotal: number | null,
    amount_total: number | null,
    created: number,
    currency: string | null,
    customer_details: CustomerDetails,
    items: Item[],
}

export type Item = {
    name: string,
    quantity: number,
    price: number,
    total: number,
}

type CustomerDetails = {
    adress: Adress,
    email: string,
    name: string,
    phone: string,
}

type Adress = {
    city: string | null,
    country: string,
    line1: string,
    line2: string,
    postal_code: string,
    state: string,

}