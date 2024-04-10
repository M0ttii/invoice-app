import Settings from "@/components/ui/Settings/Settings";
import { createClient } from "@/utils/supabase/server";
import { Suspense, cache } from "react";
import Stripe from "stripe";

type AccountPair = {
  account: Stripe.Account;
  key: string;
};

export const revalidate = 60;

export const getAccountPairs = cache(async (): Promise<AccountPair[]> => {
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

export default async function SettingsPage() {
  const data = await getAccountPairs();

  return (
    <Suspense>
      <Settings data={data}></Settings>
    </Suspense>
  );
}