export type Invoice = {
    id: string,
    amount_subtotal: number | null,
    amount_total?: number | null,
    created: number,
    currency: string | null,
    amount_discount: number | null,
    amount_shipping: number | null,
    amount_tax: number | null,
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

export type InvoiceClone = {
    id: string,
    amount_subtotal: string | null,
    amount_total?: string | null,
    amount_discount: string | null,
    amount_shipping: string | null,
    amount_tax: string | null,
    created: Date,
    formattedCreated: string,
    currency: string | null,
    customer_details: CustomerDetails,
    items: ItemClone[],
    unformattedAdress?: string | null,
}

export type ItemClone = {
    name: string,
    quantity: number,
    total: string,
}