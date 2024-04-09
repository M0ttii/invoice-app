'use client'
import { ChevronLeft, ChevronRight, Copy, CreditCard, MoreVertical, Truck } from "lucide-react";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";
import { Separator } from "../separator";
import { Skeleton } from "../skeleton";
import { Pagination, PaginationContent, PaginationItem } from "../pagination";

export default function InvoiceCardLoading() {
    return (
        <div className="">
            <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-3 text-lg">
                            <Skeleton className="h-5 w-[150px]" />
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Copy className="h-3 w-3" />
                                <span className="sr-only">Copy Order ID</span>
                            </Button>
                        </CardTitle>
                        <CardDescription>
                            <Skeleton className="h-5 w-[150px]" />
                        </CardDescription>
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
                                    <Skeleton className="h-4 w-[150px]" />
                                </span>
                                <span>
                                    <Skeleton className="h-4 w-[50px]" />
                                </span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    <Skeleton className="h-4 w-[150px]" />
                                </span>
                                <span>
                                    <Skeleton className="h-4 w-[50px]" />
                                </span>
                            </li>
                        </ul>
                        <Separator className="my-2" />
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span><Skeleton className="h-4 w-[50px]" /></span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span><Skeleton className="h-4 w-[50px]" /></span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Tax</span>
                                <span><Skeleton className="h-4 w-[50px]" /></span>
                            </li>
                            <li className="flex items-center justify-between font-semibold">
                                <span className="text-muted-foreground">Total</span>
                                <span><Skeleton className="h-4 w-[50px]" /></span>
                            </li>
                        </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3">
                            <div className="font-semibold">Shipping Information</div>
                            <address className="grid gap-1 not-italic text-muted-foreground">
                                <span><Skeleton className="h-4 w-[150px]" /></span>
                                <span><Skeleton className="h-4 w-[150px]" /></span>
                                <span><Skeleton className="h-4 w-[150px]" /></span>
                            </address>
                        </div>
                        <div className="grid auto-rows-max gap-3">
                            <div className="font-semibold">Billing Information</div>
                            <div className="text-muted-foreground">
                                <Skeleton className="h-4 w-[150px]" />
                            </div>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                        <div className="font-semibold">Customer Information</div>
                        <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Customer</dt>
                                <dd><Skeleton className="h-4 w-[150px]" /></dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Email</dt>
                                <dd>
                                    <a href="mailto:"><Skeleton className="h-4 w-[150px]" /></a>
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Phone</dt>
                                <dd>
                                    <a href="tel:"><Skeleton className="h-4 w-[150px]" /></a>
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
                                    <Skeleton className="h-4 w-[100px]" />
                                </dt>
                                <dd><Skeleton className="h-4 w-[150px]" /></dd>
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
    )
}