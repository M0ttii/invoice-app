'use server'

import { Invoice } from "@/models/Invoice";
import { supabaseAdmin } from "@/utils/supabase/admin";
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
        expand: ['data.payment_intent'],
        status: 'complete',
    });
    return sessions;
}

export async function getInvoicesForCustomer(userid: string, email: string) {
    'use server';
    const supabase = supabaseAdmin;
    const { data: keys } = (await supabase.from('stripekeys').select('*').eq('user_id', userid));

    var invoices: Invoice[] = [];

    if (keys) {
        await Promise.all(keys.map(async (key) => {
            if (key.key) {
                const sessions = await retrieveCheckoutSessions(key.key, email);
                sessions.data.forEach((session) => {
                    const tempSession = session as SessionWithExpandedPaymentIntent;
                    const { payment_intent } = tempSession;
                    if (payment_intent != null) {
                        console.log(payment_intent.amount_received)
                        var invoice: Invoice = {
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
                            }
                        }
                        invoices.push(invoice);
                    }
                });
            }
        }));
        console.log(invoices);
        return invoices;
    }

}