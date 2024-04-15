import { Suspense, cache } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../card"
import { Account } from "../Account"
import { Button } from "../../button"
import Stripe from "stripe"
import { createClient } from "@/utils/supabase/server"

interface AccountPair {
    account: Stripe.Account;
    imageUrl: string;
    key: string;
};

export const LinkedAccounts = async () => {
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

                console.log(keys[0])
                const accountPairsPromises = keys.map(key => {
                    const stripe = new Stripe(key.key || '', {
                        apiVersion: '2023-10-16',
                    });

                    return stripe.accounts.retrieve()
                        .then(accountName => ({ account: accountName, key: key.key || '' }));
                });

                const filePromise

                const accountPairs = await Promise.all(accountPairsPromises);
                resolve(accountPairs);
            } catch (error) {
                reject(error);
            }
        });
    });


    const data = await getAccountPairs();
    console.log((data[0].account.settings?.branding.icon as Stripe.File).title)
    return (
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
                            <Account icon={(pair.account.settings?.branding.icon as Stripe.File).url } key={index} name={pair.account.settings?.dashboard.display_name} />
                        ))}
                    </Suspense>
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button className="w-28">Add Account</Button>
            </CardFooter>
        </Card>
    )
}