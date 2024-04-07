import { ListFilter, MoreHorizontal } from "lucide-react";
import { Badge } from "../badge";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import Stripe from "stripe";

interface Props {
    sessions: Stripe.Checkout.Session[]
}

export default function InvoiceList({ sessions }: Props) {
    const supabase = createClient();

    async function getSessions() {
        const { data: stripeKey } = await supabase.from('stripekeys').select('*').single();
        const stripe = new Stripe(stripeKey?.key || '', {
            apiVersion: '2023-10-16',
        });
    
        return await stripe.checkout.sessions.list({
            limit: 10,
            status: 'complete',
        });
    }

    const sessions = await getSessions();

    return (
        <div className="w-full">
            <Tabs defaultValue="week">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                        <TabsTrigger value="year">Year</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 gap-1 text-sm"
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
                    </div>
                </div>
                <TabsContent value="week">
                    <Card>
                        <CardHeader className="px-7">
                            <CardTitle>Orders</CardTitle>
                            <CardDescription>
                                Recent orders from your store.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            Type
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
                                <TableBody>
                                    {sessions.map((session, index) => (
                                        <TableRow className="bg-accent" key={index}>
                                            <TableCell>
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
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}