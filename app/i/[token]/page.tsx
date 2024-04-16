import InvoicePortal from "@/components/ui/Invoice/InvoicePortal";
import { Invoice, Item } from "@/models/Invoice";
import { supabaseAdmin } from "@/utils/supabase/admin";
import Jwt from "jsonwebtoken";
import Stripe from "stripe";



type TokenMailObject = {
    customer_email: string;
    owner_email: string;
}

async function retrieveCheckoutSessions(apiKey: string, email: string) {
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

type SessionWithExpandedPaymentIntent = Stripe.Checkout.Session & {
    payment_intent: Stripe.PaymentIntent;
};

async function getInvoicesForCustomer(userid: string, email: string) {
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

export default async function InvoiceTokenSite({params}: {params: {token: string}}) {

    console.log(params.token);
    const to = Jwt.verify(params.token, "javainuse-secret-key");
    const decoded = to as TokenMailObject;
    const invoices = await getInvoicesForCustomer(decoded.owner_email, decoded.customer_email);

    return (
		<div className="w-full h-screen px-10 backdrop-blur-3xl  bg-[radial-gradient(50%_50%_at_50%_50%,_rgb(25,21,47)_0%,_rgb(11.07,_10.9,_13.04)_100%)] bg-[rgba(255,_255,_255,_1)]"> {/* Modified line */}
				<InvoicePortal invoices={invoices} ></InvoicePortal>
		</div>
	);
}