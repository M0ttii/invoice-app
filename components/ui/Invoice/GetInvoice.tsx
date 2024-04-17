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
import { generateTokenMail, getInvoicesForCustomer, retrieveCheckoutSessions } from "@/app/actions";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { Loader } from "lucide-react";
import { Label } from "../label";
import { Public_Sans } from 'next/font/google'
import { cn } from "@/utils/cn";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from "framer-motion"
import Image from "next/image";
import React from "react";

const FormSchema = z.object({
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

interface GetInvoiceProps {
    userid: string;
}

const publicSans = Public_Sans({
    display: "swap",
})

const GetInvoiceComponent = ({ userid }: GetInvoiceProps) => {
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        AOS.init();
    }, [])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        generateTokenMail(data.email, userid);
    }
    return (

        <div data-aos="zoom-in-down" data-aos-easing="ease-out">
            <div className="">
                <Card className="w-[400px] mx-auto my-auto min-h-72 bg-transparent border-0">
                    <CardContent className="">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className={cn("text-[#ffffff]/50 ", publicSans.className)}>E-mail</FormLabel>
                                            <FormControl>
                                                <Input className="h-12 bg-[#2B303F]/20" placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full h-12 bg-[#373DC7] text-white">
                                    {loading && (
                                        <Loader className="w-5 h-5 animate-spin pr-2"></Loader>
                                    )}
                                    Retrieve invoice
                                </Button>
                            </form>
                        </Form>
                        <div className="relative p-5">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#08080B] px-2 text-muted-foreground">
                                    Or
                                </span>
                            </div>
                        </div>
                        <Button type="submit" className="w-full h-12 bg-[#2B303F]/30 text-white">
                            {loading && (
                                <Loader className="w-5 h-5 animate-spin pr-2"></Loader>
                            )}
                            Return to <span className="text-[#5057FF]">&nbsp;example.com</span>
                        </Button>
                    </CardContent>
                    <CardFooter>
                        <Label className={cn(publicSans.className, " text-[#ffffff]/50 text-center leading-4")}>This service is provided by <span className="font-bold">InvoiceHub</span> and is not affiliated with <span className="font-bold">example.com</span></Label>
                    </CardFooter>
                </Card>

            </div>
        </div>

    )
}
export default GetInvoiceComponent;
