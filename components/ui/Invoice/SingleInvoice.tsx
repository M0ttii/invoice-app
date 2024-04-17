'use client'
import { Adress, Invoice, InvoiceClone } from "../../../models/Invoice";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";
import { Separator } from "../separator";
import { convertInvoiceToClone, getUnformattedAdressString } from "@/utils/converter";
import { Pagination, PaginationContent, PaginationItem } from "../pagination";
import { ChevronLeft, ChevronRight, Copy, CreditCard, MoreVertical, Truck } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Textarea } from "../textarea";
import { z } from "zod";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../form";
import InvoiceTemplate1 from "./InvoiceTemplates/Temp1";
import generatePDF from "react-to-pdf";

interface SingleInvoiceProps {
    invoice: Invoice | null;
}

const FormSchema = z.object({
    bio: z
        .string()
        .min(10, {
            message: "Bio must be at least 10 characters.",
        })
        .max(160, {
            message: "Bio must not be longer than 30 characters.",
        }),
})

export default function SingleInvoice({ invoice }: SingleInvoiceProps) {
    const targetRef = useRef(null);
    const [clone, setClone] = useState<InvoiceClone | null>(null);
    const [editing, setEditing] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            bio: useMemo(() => constructAdressString(invoice), [invoice])
        }
    })

    useEffect(() => {
        if (invoice) {
            const temp = convertInvoiceToClone(invoice);
            setClone(temp);
        }
        AOS.init();
    }, [])

    function constructAdressString(invoice: Invoice | null){
        console.log("Contruct" + invoice)
        if(!invoice) return '';
        return invoice.customer_details.name + '\n' + invoice.customer_details.adress.line1 + '\n' + invoice.customer_details.adress.line2 + '\n' + invoice.customer_details.adress.city + ', ' + invoice.customer_details.adress.country + ' ' + invoice.customer_details.adress.postal_code;
    }


    function handleEdit(data?: z.infer<typeof FormSchema>) {
        console.log(editing)
        if (!editing) setEditing(true);
        if (editing) {
            var tempClone = clone;
            if(tempClone) tempClone.unformattedAdress = data?.bio;
            setClone(tempClone);
            setEditing(false)

        }
    }

    function download(){
        const element = <div ref={targetRef}><InvoiceTemplate1 invoice={invoice} height={297} width={210} /></div>

        generatePDF(targetRef, {filename: 'invoice.pdf'});
    }

    if (!invoice) {
        return null;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEdit)}>
                <Card data-aos="zoom-in-down" data-aos-easing="ease-out" className="overflow-hidden backdrop-filter backdrop-blur-[100px] backdrop-saturate-[80%] border-opacity-0 bg-[#1E1E1E]/40">
                    <CardHeader className="flex flex-row items-start bg-[#0F0F14]/20">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                Order ID: {clone?.id}
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    <Copy className="h-3 w-3" />
                                    <span className="sr-only">Copy Order ID</span>
                                </Button>
                            </CardTitle>
                            <CardDescription>Date: {clone?.formattedCreated}</CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-1">
                            {editing ? (
                                <Button type="submit" size="sm" variant="ghost" className="h-8 gap-1 bg-[#373DC7]">
                                    <Truck className="h-3.5 w-3.5" />
                                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap ">
                                        {editing ? "Save" : "Edit Invoice"}
                                    </span>
                                </Button>
                            ) : (
                                <Button type="submit" size="sm" variant="ghost" className="h-8 gap-1 bg-[#373DC7]">
                                    <Truck className="h-3.5 w-3.5" />
                                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap ">
                                        {editing ? "Save" : "Edit Invoice"}
                                    </span>
                                </Button>
                            )}
                            <Button onClick={download} size="sm" variant="ghost" className="h-8 gap-1 bg-[#373DC7]">
                                <Truck className="h-3.5 w-3.5" />
                                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap ">
                                    Download
                                </span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                            <div className="font-semibold">Order Details</div>
                            <ul className="grid gap-3">
                                {clone?.items.map((item, index) => (
                                    <InvoiceProduct
                                        key={index}
                                        name={item.name}
                                        quantity={item.quantity}
                                        total={item.total}
                                    />
                                ))}
                            </ul>
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between font-semibold">
                                    <span className="text-muted-foreground">Total</span>
                                    <span>{clone?.amount_total ? clone.amount_total : "$0.00"}</span>
                                </li>
                            </ul>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <div className="font-semibold">Shipping Information</div>
                                {!editing ? (
                                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                                        {getUnformattedAdressString(clone)}
                                    </address>
                                ) : (
                                    <FormField control={form.control} name="bio" render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea className="h-20" {...field} rows={3}></Textarea>
                                            </FormControl>
                                        </FormItem>
                                    )}>
                                    </FormField>
                                )}
                            </div>
                            <div className="grid auto-rows-max gap-3">
                                <div className="font-semibold">Billing Information</div>
                                <div className="text-muted-foreground">
                                    Same as shipping address
                                </div>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid gap-3">
                            <div className="font-semibold">Customer Information</div>
                            <dl className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">Customer</dt>
                                    <dd>{clone?.customer_details.name}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">Email</dt>
                                    <dd>
                                        <a href="mailto:">{clone?.customer_details.email}</a>
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-muted-foreground">Phone</dt>
                                    <dd>
                                        <a href="tel:">{clone?.customer_details.phone}</a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid gap-3">
                            <div className="font-semibold">Payment Information</div>
                            <dl className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <dt className="flex items-center gap-1 text-muted-foreground">
                                        <CreditCard className="h-4 w-4" />
                                        Visa
                                    </dt>
                                    <dd>**** **** **** 4532</dd>
                                </div>
                            </dl>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>

    )
}

const InvoiceProduct = ({ name, quantity, total }: { name: string, quantity: number, total: string }) => {
    return (
        <li className="flex items-center justify-between">
            <span className="text-muted-foreground">
                {name} x <span>{quantity.toString()}</span>
            </span>
            <span>{total.toString()}</span>
        </li>
    )
}