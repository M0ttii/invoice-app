import { createClient } from "@/utils/supabase/server";
import { Suspense, cache } from "react";
import Stripe from "stripe";

type AccountPair = {
  account: Stripe.Account;
  key: string;
};

export const revalidate = 60;

export default async function SettingsPage() {
  return (
    <div className=""></div>
  );
}