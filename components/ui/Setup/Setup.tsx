'use client'
import { useRef, useState } from "react";
import StripeAPIComponent from "./AddStripeAccount";
import SelectedAccounts from "./SelectedAccounts";
import { createClient } from "@/utils/supabase/client";

export default function Setup() {
    const [selectedAccounts, setSelectedAccounts] = useState([""])
    const selectedAccountsRef = useRef<{ add: (account: string) => void } | null>(null);
    const supabase = createClient();

    async function addAccount(key: string) {
        const { data: userDetails } = await supabase
            .from('users')
            .select('*')
            .single();

        const { data: existingKey } = await supabase.from('stripekeys').select('*').eq('key', key).single();
        if (existingKey) {
            console.log("Key already exists");
            return;
        }

        const result = await supabase.from('stripekeys').insert({ key: key, user_id: userDetails?.id });
        if (!result.error && result.status === 201) {
            console.log("Key inserted");
            setSelectedAccounts([...selectedAccounts, key])
            if (selectedAccountsRef.current) {
                selectedAccountsRef.current.add(key);
            }
        }

    }

    return (
        <div className="flex min-h-screen justify-center w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4">
                <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-center gap-4 lg:col-span-2 lg:gap-8">
                                <StripeAPIComponent selectedAccounts={selectedAccounts} buttonClick={addAccount} />
                            </div>
                            <div className="grid auto-rows-max items-center justify-center gap-4 lg:gap-8"> {/* Updated line */}
                                <SelectedAccounts selectedAccounts={selectedAccounts} ref={selectedAccountsRef}></SelectedAccounts>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}