import { createClient } from '@/utils/supabase/server';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

export async function GET(request: Request) {
    try {
        const supabase = createClient();
        const { data: keys } = await supabase.from('stripekeys').select('*');

        if (!keys) {
            return Response.json([]);
        }

        const accountPairsPromises = keys.map(key => {
            const stripe = new Stripe(key.key || '', {
                apiVersion: '2023-10-16',
            });

            return stripe.accounts.retrieve()
                .then(accountName => ({ account: accountName, key: key.key || '' }));
        });

        const accountPairs = await Promise.all(accountPairsPromises);
        return Response.json(accountPairs);
    } catch (error) {
        return Response.error();
    }
}