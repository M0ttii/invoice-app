import { Delete, DeleteIcon, Edit, Trash } from "lucide-react";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { Switch } from "../switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../select";
import { getAccountName, getAccountPairs } from "@/app/actions";
import { Suspense, cache, use, useEffect, useState } from "react";
import Stripe from "stripe";
import useSWR, { Fetcher } from 'swr'
import { set } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";
import { Account } from "./Account";

interface AccountPair {
    account: Stripe.Account;
    key: string;
};

export default async function SettingsStripe() {
    const getAccountPairs = cache(async (): Promise<AccountPair[]> => {
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
    });

    const data = await getAccountPairs();
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Linked Stripe Accounts</CardTitle>
                    <CardDescription>
                        Add/Remove Stripe accounts that are linked to your store.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-2">
                        <Suspense fallback={<p>Loading</p>}>

                            {data.map((pair: AccountPair, index) => (
                                <Account key={index} name={pair.account.settings?.dashboard.display_name} />
                            ))}
                        </Suspense>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button className="w-28">Add Account</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Payment Type</CardTitle>
                    <CardDescription>
                        Select if only one-time-payments are shown in the invoice list or if subscriptions are shown as well.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select payment type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Types</SelectLabel>
                                <SelectItem value="apple">Only One-Time-Payments</SelectItem>
                                <SelectItem value="banana">One-Time-Payments and Subscriptions</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button className="w-28">Add Account</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Auto Email Customers</CardTitle>
                    <CardDescription>
                        When turned on, customers will receive an email with their invoice after purchase.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2">
                        <Switch id="email" />
                        <Label htmlFor="email">Turn On Email Invoices</Label>
                    </div>

                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
