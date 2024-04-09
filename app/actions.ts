'use server'

import { Invoice, Item } from "@/models/Invoice";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

type SessionWithExpandedPaymentIntent = Stripe.Checkout.Session & {
    payment_intent: Stripe.PaymentIntent;
};

export async function retrievePaymentIntents(apiKey: string, paymentIntentId: string) {
    const stripe = new Stripe(apiKey, {
        apiVersion: '2023-10-16',
    });
    return await stripe.paymentIntents.retrieve(paymentIntentId);
}

export async function retrieveCheckoutSessions(apiKey: string, email: string) {
    const stripe = new Stripe(apiKey, {
        apiVersion: '2023-10-16',
    });
    const sessions = await stripe.checkout.sessions.list({
        customer_details: { email },
        expand: ['data.payment_intent', 'data.line_items'],
        status: 'complete',
    });
    return sessions;
}

export async function getDashboardSessions() {
    const supabase = createClient();
    const { data: stripeKey } = await supabase.from('stripekeys').select('*').single();
    const stripe = new Stripe(stripeKey?.key || '', {
        apiVersion: '2023-10-16',
    });

    return await stripe.checkout.sessions.list({
        limit: 10,
        status: 'complete',
    });
}

export async function getInvoicesForCustomer(userid: string, email: string) {
    'use server';
    const supabase = supabaseAdmin;
    const { data: keys } = await supabase.from('stripekeys').select('*').eq('user_id', userid);
    const invoices: Invoice[] = [];

    if (keys) {
        const sessionPromises = keys.map(async (key) => {
            if (key.key) {
                const sessions = await retrieveCheckoutSessions(key.key, email);
                return sessions.data;
            }
            return [];
        });

        const sessionResults = await Promise.all(sessionPromises);
        const flattenedSessions = sessionResults.flat();

        flattenedSessions.forEach((session) => {
            const tempSession = session as SessionWithExpandedPaymentIntent;
            const { payment_intent } = tempSession;

            if (payment_intent) {
                console.log(payment_intent.amount_received);
                const invoice: Invoice = {
                    id: session.id || '',
                    amount_subtotal: session.amount_subtotal,
                    amount_total: payment_intent.amount_received,
                    created: session.created,
                    currency: payment_intent.currency,
                    customer_details: {
                        adress: {
                            city: session.customer_details?.address?.city || '',
                            country: session.customer_details?.address?.country || '',
                            line1: session.customer_details?.address?.line1 || '',
                            line2: session.customer_details?.address?.line2 || '',
                            postal_code: session.customer_details?.address?.postal_code || '',
                            state: session.customer_details?.address?.state || '',
                        },
                        email: session.customer_details?.email || '',
                        name: session.customer_details?.name || '',
                        phone: session.customer_details?.phone || '',
                    },
                    items: (session.line_items?.data || []).map((item): unknown => {
                        return {
                            name: item.description,
                            price: item.price || null,
                            quantity: item.quantity || null,
                            total: item.amount_total,
                        };
                    }) as Item[],
                };
                invoices.push(invoice);
            }
        });

        console.log(invoices);
        return invoices;
    }

    return [];
}