'use server'

import { supabaseAdmin } from "@/utils/supabase/admin";
import Stripe from "stripe";

export async function getInvoicesForCustomer(userid: string, email: string) {
    'use server';
    const supabase = supabaseAdmin;
    const { data: existingKey } = await supabase.from('stripekeys').select('*').eq('user_id', userid).single();
    console.log(existingKey?.key);
}

export async function getSessions(userid: string) {
    'use server';
    const supabase = supabaseAdmin;
    const { data: stripeKeys } = await supabase.from('stripekeys').select('*').eq('user_id', userid);

    const stripe = new Stripe(stripeKey?.key || '', {
        apiVersion: '2023-10-16',
    });

    return await stripe.checkout.sessions.list({
        limit: 10,
        status: 'complete',
    });
}