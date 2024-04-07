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
import { getInvoicesForCustomer } from "@/app/actions";
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

interface GetInvoiceProps {
    userid: string;
    setShowList: Dispatch<SetStateAction<boolean>>;
}

const GetInvoiceComponent = ({userid, setShowList}: GetInvoiceProps) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        
        setShowList(true);
        //getInvoicesForCustomer(userid, data.username);
        // try {
        //     await sendEmail({
        //         to: 'kappamotti@gmail.com',
        //         from: 'info@invoicehub.app',
        //         subject: 'Invoice',
        //         message: 'This is an invoice'
        //     });
        // } catch (error) {
        //     console.error(error);
        // }
    }

    // return (
    //     <div className="max-w-sm mx-auto my-auto min-h-72 p-6 min-w-80 bg-white rounded-lg shadow-md flex flex-col justify-center">
    //         <div className="">
    //             <Form {...form}>
    //                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    //                     <FormField
    //                         control={form.control}
    //                         name="username"
    //                         render={({ field }) => (
    //                             <FormItem>
    //                                 <FormLabel>EMail</FormLabel>
    //                                 <FormControl>
    //                                     <Input placeholder="shadcn" {...field} />
    //                                 </FormControl>
    //                                 <FormDescription>
    //                                     Please provide your email address.
    //                                 </FormDescription>
    //                                 <FormMessage />
    //                             </FormItem>
    //                         )}
    //                     />
    //                     <Button type="submit" className="w-full">Retrieve invoice</Button>
    //                 </form>
    //             </Form>
    //         </div>
    //     </div>

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
                            name="username"
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
                        <Button type="submit" className="w-full">Retrieve invoice</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
export default GetInvoiceComponent;