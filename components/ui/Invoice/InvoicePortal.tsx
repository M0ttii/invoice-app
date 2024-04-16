'use client'
import { ListFilter, MoreHorizontal } from "lucide-react";
import { Badge } from "../badge";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import Stripe from "stripe";
import { getInvoicesForCustomer, retrieveCheckoutSessions } from "@/app/actions";
import { Invoice } from "@/models/Invoice";
import { useState } from "react";
import { Label } from "../label";
import { cn } from "@/utils/cn";
import { InvoiceDialog } from "./InvoiceDialog";
import { Public_Sans } from 'next/font/google'
import InvoiceList from "./InvoiceList";
import SingleInvoice from "./SingleInvoice";

interface Props {
    invoices: Invoice[];
}

const publicSans = Public_Sans({
    display: "swap",
})

const NameAndPicture = () => {
    return (
        <div className="flex flex-col pb-0 items-center">
            <div className="bg-red-400 rounded-md w-16 h-16 mb-3 shadow-md"></div>
            <div className="flex flex-col items-center space-y-2">
                <Label className={cn("font-bold  text-4xl ", publicSans.className)}>Hallo</Label>
            </div>
        </div>
    )
}

export default function InvoicePortal({ invoices }: Props) {
    const [open, setOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

    function handleOnClick(invoice: Invoice) {
        setSelectedInvoice(invoice);
        setOpen(true);
    }

    return (
        <div className="flex flex-col h-screen justify-center w-full lg:px-0  xl:px-40 md:px-0 2xl:px-52 sm:px-0">
            <div className="transform -translate-y-10">
                <div className="sm:pb-10">
                    <NameAndPicture />
                </div>
                {open ?
                    <div className="mx-96">
                        <SingleInvoice invoice={selectedInvoice} />
                    </div>
                    :
                    <InvoiceList handleOnClick={handleOnClick} invoices={invoices}
                    />}
            </div>
            <div className="flex justify-center">
                <div className="absolute bottom-5">
                    <Label className={cn(publicSans.className, " text-[#ffffff]/50 text-center leading-4")}>This service is provided by <span className="font-bold">InvoiceHub</span> and is not affiliated with <span className="font-bold">waivy.com</span></Label>
                </div>
            </div>
        </div>
    );
}