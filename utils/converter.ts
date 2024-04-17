import { Invoice, InvoiceClone } from "@/models/Invoice";
import { Item, ItemClone } from "@/models/Invoice";
import React from "react";

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
        }),
        unformattedAdress: constructAdressString(invoice),
    };
}

export function getUnformattedAdressString(invoice: InvoiceClone | null){
    const adressString = invoice?.unformattedAdress || '';
    const adressLines = adressString.split('\n');
    return adressLines.map((line, index) => {
        return React.createElement('span', { key: index }, line);
    
    });
}

function constructAdressString(invoice: Invoice | null){
    if(!invoice) return '';
    return invoice.customer_details.name + '\n' + invoice.customer_details.adress.line1 + '\n' + invoice.customer_details.adress.line2 + '\n' + invoice.customer_details.adress.city + ', ' + invoice.customer_details.adress.country + ' ' + invoice.customer_details.adress.postal_code;
}

function unixToDate(unix: number): Date {
    return new Date(unix * 1000);
}