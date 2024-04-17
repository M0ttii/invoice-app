'use server'

import { Invoice, Item } from "@/models/Invoice";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";
import  Jwt  from "jsonwebtoken";
import { send } from "process";
import { sendTokenMail } from "@/aws/email";

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
        expand: ['data.payment_intent', 'data.line_items'],
        status: 'complete',
    });
}

export async function getAccountForKey(apiKey: string) {
    const stripe = new Stripe(apiKey, {
        apiVersion: '2023-10-16',
    });

    const account = await stripe.accounts.retrieve();
    return account;
}

type AccountPair = {
    account: Stripe.Account;
    key: string;
};

export async function getAccountPairs(): Promise<AccountPair[]> {
    console.log("call");
    return new Promise(async (resolve, reject) => {
        try {
            const supabase = createClient();
            const { data: keys } = await supabase.from('stripekeys').select('*');

            if (!keys) {
                resolve([]);
                return;
            }

            const accountPairsPromises = keys.map(key => {
                const stripe = new Stripe(key.key || '', {
                    apiVersion: '2023-10-16',
                });

                return stripe.accounts.retrieve()
                    .then(accountName => ({ account: accountName, key: key.key || '' }));
            });

            const accountPairs = await Promise.all(accountPairsPromises);
            resolve(accountPairs);
        } catch (error) {
            reject(error);
        }
    });
}

export async function getAccountName(userid: string) {
    console.log("ggs")
    'use server';
    const supabase = supabaseAdmin;
    const { data: keys } = await supabase.from('stripekeys').select('*').eq('user_id', userid).single(); 

    if(keys){
        const stripe = new Stripe(keys.key || '', {
            apiVersion: '2023-10-16',
        });

        const account = await stripe.accounts.retrieve();
        console.log("account")
        console.log(account);
    }

}

type TokenMailObject = {
    customer_email: string;
    owner_email: string;
}

export async function generateTokenMail(email: string, user_id: string){
    'use server';

    const object: TokenMailObject = {
        customer_email: email,
        owner_email: user_id,
    }

    const token = Jwt.sign(object, "javainuse-secret-key");
    sendTokenMail({to: email, tokenLink: "http://localhost:3000/i/" + token});
}

export async function updateTitle(title: string){
    'use server';
    const supabase = createClient();
    const session = await supabase.auth.getSession();
    if(session && session.data.session){
        const userid = session.data.session.user.id;
        const { error } = await supabase.from('users').update({brand_name: title}).eq('id', userid);
        if(error){
            return false;
        }
        return true;
    }
    return false;
}

export async function getInvoicesForCustomer(userid: string, email: string) {
    'use server';
    const supabase = supabaseAdmin;
    const { data: keys } = await supabase.from('stripekeys').select('*').eq('user_id', userid);
    const invoices: Invoice[] = [];

    try{

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
                        amount_discount: session.total_details?.amount_discount || null,
                        amount_shipping: session.total_details?.amount_shipping || null,
                        amount_tax: session.total_details?.amount_tax || null,
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
    } catch (error) {
        return [];
    }
}