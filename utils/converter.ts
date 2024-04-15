import { Invoice, InvoiceClone } from "@/models/Invoice";
import { Item, ItemClone } from "@/models/Invoice";

export function convertInvoiceToClone(invoice: Invoice): InvoiceClone {
    return {
        ...invoice,
        id: invoice?.id.slice(-8).toUpperCase(),
        amount_subtotal: invoice.amount_subtotal ? (invoice.amount_subtotal / 100).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : null,
        amount_total: invoice.amount_total ? (invoice.amount_total / 100).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : null,
        amount_discount: invoice.amount_discount ? (invoice.amount_discount / 100).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : null,
        amount_shipping: invoice.amount_shipping ? (invoice.amount_shipping / 100).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : null,
        amount_tax: invoice.amount_tax ? (invoice.amount_tax / 100).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) : null,
        created: new Date(invoice.created),
        formattedCreated: unixToDate(invoice.created).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        items: invoice.items.map((item: Item) => {
            const itemClone: ItemClone = {
                ...item,
                total: (item.total / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            };
            return itemClone;
        })
    };
}

function unixToDate(unix: number): Date {
    return new Date(unix * 1000);
}