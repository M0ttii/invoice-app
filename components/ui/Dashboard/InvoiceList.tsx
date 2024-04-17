'use client'
import { ListFilter, File } from "lucide-react";
import { Button } from "../button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { Skeleton } from "../skeleton";
import { Badge } from "../badge";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/client";
import { getDashboardSessions } from "@/app/actions";
import { handleClientScriptLoad } from "next/script";

interface Props {
    handleSelectSession: (session: Stripe.Checkout.Session) => void;
}

export async function getSessions() {
    const supabase = createClient();
    const { data: stripeKey } = await supabase.from('stripekeys').select('*').single();
    const stripe = new Stripe(stripeKey?.key || '', {
        apiVersion: '2023-10-16',
    });

    return await stripe.checkout.sessions.list({
        limit: 10,
        expand: ['data.payment_intent', 'data.line_items'],
        status: 'complete',
    });
}

export default function InvoiceList({ handleSelectSession}: Props) {
    const [sessions, setSessions] = useState<Stripe.Checkout.Session[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSessions() {
            getDashboardSessions().then((sessions) => {
                setSessions(sessions.data)
                handleSelectSession(sessions.data[0]);
            }).finally(() => setLoading(false));
        }
        fetchSessions();
    }, []);

    function onSelectInvoice(session: Stripe.Checkout.Session) {
        handleSelectSession(session);
    }

    return (
        <Tabs defaultValue="week">
            <div className="flex items-center">
                <TabsList className=" bg-transparent">
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 gap-1 text-sm bg-[#373DC7] "
                            >
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only">Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                Fulfilled
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Declined
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Refunded
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 gap-1 text-sm bg-[#373DC7]"
                    >
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                </div>
            </div>
            <TabsContent value="week">
                <Card>
                    <CardHeader className="px-7 ">
                        <CardTitle>Orders</CardTitle>
                        <CardDescription>
                            Recent orders from your store.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="-mt-5">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">Customer</TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Business
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Status
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Date
                                    </TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            {loading && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <Skeleton className="h-6 min-w-full" />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <Skeleton className="h-6 w-full" />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                            {!loading && (
                                <TableBody>
                                    {sessions.map((session, index) => (
                                        <TableRow onClick={() => onSelectInvoice(session)} className="dark:bg-[#18181B] hover:z-100 hover:cursor-pointer transition ease-in-out delay-50 hover:scale-[1.01] duration-300" key={index}>
                                            <TableCell className="">
                                                <div className="font-medium">{session.customer_details?.name}</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    {session.customer_details?.email}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Sale
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    {session.status?.toString()}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {session.created?.toString()}
                                            </TableCell>
                                            <TableCell className="text-right">{session.amount_total?.toExponential()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            )}

                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}