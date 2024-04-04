'use client'
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../card"
import { Label } from "../label"
import Stripe from "stripe";
import { set } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";

interface Props {
    selectedAccounts: string[];
}

const SelectedAccounts = forwardRef((props: Props, ref: any) => {
    const [accounts, setAccounts] = useState<string[]>([]);
    const supabase = createClient();

    useEffect(() => {
        async function getAccounts() {
            const { data: userDetails } = await supabase
                .from('users')
                .select('*')
                .single();

            const { data: keys } = await supabase.from('stripekeys').select('*');
            if (keys) {
                keys.forEach(async (key) => {
                    if(key.key == null) return;
                    const stripe = new Stripe(key.key, { apiVersion: '2023-10-16' });
                    const account = await stripe.accounts.retrieve();
                    setAccounts([...accounts, account.id]);
                });
            }
        }
        getAccounts();
    }, []);

    const add = (account: string) => {
        console.log("Added account" + account);

        const stripe = new Stripe(account, {apiVersion: '2023-10-16'});
        stripe.accounts.retrieve().then(function(account) {
            setAccounts([...accounts, account.id]);
          }).catch(function(error) {
            console.error('Error retrieving account:', error);
          });
    }

    useImperativeHandle(ref, () => ({
        add,
    }));

    return (
        <Card className="min-h-80 min-w-60">
            <CardHeader>
                <CardTitle>Added Accounts</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-2">
                    {accounts.map((account) => (
                        <div className=" bg-red-300 h-8">
                            <Label key={account}>{account}</Label>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
})

export default SelectedAccounts;