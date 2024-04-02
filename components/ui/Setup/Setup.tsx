'use client'
import { LinkIcon, LockIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../input";
import { Button } from "../button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { createClient } from "@/utils/supabase/client";

interface StripeAPIComponentProps {
    onButtonClick: () => void;
}

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})



export default function StripeAPIComponent() {
    const supabase = createClient();

    const updateKey = async (key: string) => {
        const { data: userDetails } = await supabase
            .from('users')
            .select('*')
            .single();

        console.log(userDetails?.full_name);


            const {data: stripeKey, error } = await supabase.from('stripekeys').select('*').single();
            if(error || stripeKey === null){
                console.log(error);
                const result = await supabase.from('stripekeys').insert({key: key, user_id: userDetails?.id});
                if(!result.error && result.status === 201){
                    console.log("Key inserted");
                }
                return;
            }
            console.log(stripeKey?.key);

        
    }



    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        updateKey(data.username);
    }

    const handleButtonClick = () => {
        console.log("Der Button wurde geklickt!");
        // Fügen Sie hier die Logik ein, die ausgeführt werden soll
    };
    return (


        <div className="max-w-sm mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
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
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>

    )
}

