
import { Dashboard } from "@/components/ui/Dashboard/Dashboard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export default async function DashboardPage() {
    const supabase = createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if(!user) {
        return redirect('/signin');
    }

    const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .maybeSingle();

    if (error) {
        console.log(error);
    }

    const { data: products } = await supabase
        .from('products')
        .select('*, prices(*)')
        .eq('active', true)
        .eq('prices.active', true)
        .order('metadata->index')
        .order('unit_amount', { referencedTable: 'prices' });

    const { data: stripeKey } = await supabase.from('stripekeys').select('*').single();

    const stripe = new Stripe(stripeKey?.key || '', {
        apiVersion: '2023-10-16',
    });

    const sessions = await stripe.checkout.sessions.list({
        limit: 10,
        status: 'complete',
    });

    const payments = await stripe.paymentIntents.list({

    });

    console.log(payments.data);


    return (
        <Dashboard sessions={sessions.data}></Dashboard>
    );
}