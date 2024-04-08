'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { Button } from "../button";
import { sendEmail } from "@/aws/email";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { get } from "http";
import { getInvoicesForCustomer, retrieveCheckoutSessions } from "@/app/actions";
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Loader } from "lucide-react";

const FormSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

interface GetInvoiceProps {
    userid: string;
    setShowList: Dispatch<SetStateAction<boolean>>;
    setCustomerEmail: Dispatch<SetStateAction<string>>;
    oonSubmit: (email: string) => void;
    loading: boolean
}

const GetInvoiceComponent = ({userid, setShowList, setCustomerEmail, oonSubmit, loading}: GetInvoiceProps) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setCustomerEmail(data.email);
        oonSubmit(data.email);
    }



    return (
        <Card className="max-w-sm mx-auto my-auto min-h-72">
            <CardHeader>
                <CardTitle>Retrieve Invoice</CardTitle>
                <CardDescription>
                    Please provide your email address to retrieve your invoice.</CardDescription>  
            </CardHeader>
            <CardContent>
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>EMail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please provide your email address.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            {loading && (
                                <Loader className="w-5 h-5 animate-spin pr-2"></Loader>
                                )}
                            Retrieve invoice
                            </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
export default GetInvoiceComponent;