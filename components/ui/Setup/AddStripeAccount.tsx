'use client'
import { LinkIcon, LockIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../input";
import { Button } from "../button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { createClient } from "@/utils/supabase/client";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Label } from "../label";

interface StripeAPIComponentProps {
    selectedAccounts: string[];
    buttonClick: (username: string) => void;
}

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

const StripeAPIComponent = (props: StripeAPIComponentProps) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        props.buttonClick(data.username);
    }

    // async function listStripeAccs() {
    //     const { data: stripeKey, error } = await supabase.from('stripekeys').select('*').single();

    //     const stripe = new Stripe(stripeKey?.key || '', {
    //         apiVersion: '2023-10-16',
    //     });

    //     const accounts = await stripe.accounts.list();
    //     if (error) {
    //         console.log(error);
    //     }
    //     console.log(accounts.data);
    // }

    const handleButtonClick = () => {
        console.log("Der Button wurde geklickt!");
        // Fügen Sie hier die Logik ein, die ausgeführt werden soll
    };
    return (
        <div className="max-w-sm mx-auto my-auto min-h-72 p-6 min-w-80 bg-white rounded-lg shadow-md flex flex-col justify-center">
            <div className="">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stripe API Key</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please provide your Stripe API Key.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Add Stripe Account</Button>
                    </form>
                </Form>
            </div>
        </div>

    )
}
export default StripeAPIComponent;

