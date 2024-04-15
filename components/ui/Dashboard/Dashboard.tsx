'use client'
import { Home, LineChart, ListFilter, Package, Package2, PanelLeft, Search, Settings, ShoppingCart, Users2, File, Copy, Truck, MoreVertical, CreditCard, ChevronLeft, ChevronRight, XOctagon, LoaderIcon, Loader2Icon, CopyIcon } from "lucide-react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import Stripe from "stripe";
import InvoiceCardLoading from "./InvoiceCardLoading";
import InvoiceLink from "./InvoiceLink";
import InvoiceList from "./InvoiceList";
import InvoiceCard from "./InvoiceCard";
import { Invoice, Item } from "@/models/Invoice";
import { useState } from "react";

export const revalidate = 60;

type SessionWithExpandedPaymentIntent = Stripe.Checkout.Session & {
    payment_intent: Stripe.PaymentIntent;
};

export function Dashboard() {
    const [selectedSession, setSelectedSession] = useState<Invoice | null>(null);

    function handleSelectSession(session: Stripe.Checkout.Session) {
        const tempSession = session as SessionWithExpandedPaymentIntent;
        const { payment_intent } = tempSession;
        const invoice: Invoice = {
            id: session.id || '',
            amount_subtotal: session.amount_subtotal,
            amount_total: payment_intent?.amount_received || null,
            created: session.created,
            currency: payment_intent?.currency || null,
            amount_discount: session.total_details?.amount_discount || null,
            amount_tax: session.total_details?.amount_tax || null,
            amount_shipping: session.total_details?.amount_shipping || null,
            customer_details: {
                adress: {
                    city: session.customer_details?.address?.city || '',
                    country: session.customer_details?.address?.country || '',
                    line1: session.customer_details?.address?.line1 || '',
                    line2: session.customer_details?.address?.line2 || '',
                    postal_code: session.customer_details?.address?.postal_code || '',
                    state: session.customer_details?.address?.state || '',
                },
                email: session.customer_details?.email || '',
                name: session.customer_details?.name || '',
                phone: session.customer_details?.phone || '',
            },
            items: (session.line_items?.data || []).map((item): unknown => {
                return {
                    name: item.description,
                    price: item.price || null,
                    quantity: item.quantity || null,
                    total: item.amount_total,
                };
            }) as Item[],
        };
        setSelectedSession(invoice);

    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-[#161618]">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-3">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Invoices</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>

                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <InvoiceLink></InvoiceLink>
                        <InvoiceList handleSelectSession={handleSelectSession}></InvoiceList>
                    </div>
                    {/* {isLoading && <InvoiceCardLoading></InvoiceCardLoading>} */}
                    <div >
                        {selectedSession ? <InvoiceCard invoice={selectedSession}></InvoiceCard> : <InvoiceCardLoading></InvoiceCardLoading>}
                    </div>
                </main>
            </div>
        </div>
    )
}