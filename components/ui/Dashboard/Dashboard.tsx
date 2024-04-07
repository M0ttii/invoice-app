'use client'
import { Home, LineChart, ListFilter, Package, Package2, PanelLeft, Search, Settings, ShoppingCart, Users2, File, Copy, Truck, MoreVertical, CreditCard, ChevronLeft, ChevronRight, XOctagon, LoaderIcon, Loader2Icon, CopyIcon } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from 'next/image';
import { Button } from "../button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Progress } from "../progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "../separator";
import { Pagination, PaginationContent, PaginationItem } from "../pagination";
import Stripe from "stripe";
import { useEffect, useState } from "react";
import { Skeleton } from "../skeleton";
import { createClient } from "@/utils/supabase/client";

interface Props {
    sessions: Stripe.Checkout.Session[]
}

export function Dashboard(sessions: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();
    const [userID, setUserID] = useState<string | undefined>("");

    useEffect(() => {
        async function getUser() {
            return await supabase
                .from('users')
                .select('*')
                .single();
        }

        getUser().then((user) => setUserID(user.data?.id)).finally(() => setIsLoading(false));
    }, []);

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
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card className="sm:col-span-2">
                                <CardHeader className="pb-3">
                                    <CardTitle>Invoice Link</CardTitle>
                                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                                        Share this link with your customers.
                                        Customers can retrieve their invoices by clicking the link.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="space-x-4">
                                    {/* <Button onClick={obSubmit}>
                                        {isLoading && (
                                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Create Invoice Link
                                    </Button> */}
                                    <div className="w-full h-10 bg-white border rounded-lg text-center items-center flex p-2">
                                        {isLoading ? (
                                            <Skeleton className="h-4 w-full" />
                                        ) : (
                                            <div className="flex justify-start font-mono text-sm text-zinc-900">
                                                http://localhost:3000/u/{userID}
                                            </div>
                                        )
                                        }
                                        <div className="flex w-full justify-end">
                                            <Button className="w-8 h-8 hover:bg-zinc-100 hover:text-zinc-50" variant="ghost" size="icon">
                                                <CopyIcon className="h-4 w-4 text-zinc-900" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardDescription>This Week</CardDescription>
                                    <CardTitle className="text-4xl">$1329</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +25% from last week
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={25} aria-label="25% increase" />
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardDescription>This Month</CardDescription>
                                    <CardTitle className="text-3xl">$5,329</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +10% from last month
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={12} aria-label="12% increase" />
                                </CardFooter>
                            </Card>
                        </div>
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
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <File className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">Export</span>
                                    </Button>
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
                                                {sessions.sessions.map((session, index) => (
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
                    <div>
                        <Card className="overflow-hidden">
                            <CardHeader className="flex flex-row items-start bg-muted/50">
                                <div className="grid gap-0.5">
                                    <CardTitle className="group flex items-center gap-2 text-lg">
                                        Order ID: Oe31b70H
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Copy className="h-3 w-3" />
                                            <span className="sr-only">Copy Order ID</span>
                                        </Button>
                                    </CardTitle>
                                    <CardDescription>Date: November 23, 2023</CardDescription>
                                </div>
                                <div className="ml-auto flex items-center gap-1">
                                    <Button size="sm" variant="outline" className="h-8 gap-1">
                                        <Truck className="h-3.5 w-3.5" />
                                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                            Open Invoice
                                        </span>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="outline" className="h-8 w-8">
                                                <MoreVertical className="h-3.5 w-3.5" />
                                                <span className="sr-only">More</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Export</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Trash</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 text-sm">
                                <div className="grid gap-3">
                                    <div className="font-semibold">Order Details</div>
                                    <ul className="grid gap-3">
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Glimmer Lamps x <span>2</span>
                                            </span>
                                            <span>$250.00</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                Aqua Filters x <span>1</span>
                                            </span>
                                            <span>$49.00</span>
                                        </li>
                                    </ul>
                                    <Separator className="my-2" />
                                    <ul className="grid gap-3">
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>$299.00</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span>$5.00</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Tax</span>
                                            <span>$25.00</span>
                                        </li>
                                        <li className="flex items-center justify-between font-semibold">
                                            <span className="text-muted-foreground">Total</span>
                                            <span>$329.00</span>
                                        </li>
                                    </ul>
                                </div>
                                <Separator className="my-4" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        <div className="font-semibold">Shipping Information</div>
                                        <address className="grid gap-0.5 not-italic text-muted-foreground">
                                            <span>Liam Johnson</span>
                                            <span>1234 Main St.</span>
                                            <span>Anytown, CA 12345</span>
                                        </address>
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
                                            <dd>Liam Johnson</dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">Email</dt>
                                            <dd>
                                                <a href="mailto:">liam@acme.com</a>
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-muted-foreground">Phone</dt>
                                            <dd>
                                                <a href="tel:">+1 234 567 890</a>
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
                            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                                <div className="text-xs text-muted-foreground">
                                    Updated <time dateTime="2023-11-23">November 23, 2023</time>
                                </div>
                                <Pagination className="ml-auto mr-0 w-auto">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <Button size="icon" variant="outline" className="h-6 w-6">
                                                <ChevronLeft className="h-3.5 w-3.5" />
                                                <span className="sr-only">Previous Order</span>
                                            </Button>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <Button size="icon" variant="outline" className="h-6 w-6">
                                                <ChevronRight className="h-3.5 w-3.5" />
                                                <span className="sr-only">Next Order</span>
                                            </Button>
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}