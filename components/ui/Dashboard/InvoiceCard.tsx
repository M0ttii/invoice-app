
import { ChevronLeft, ChevronRight, Copy, CreditCard, MoreVertical, Truck } from "lucide-react";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";
import { Separator } from "../separator";
import { Pagination, PaginationContent, PaginationItem } from "../pagination";
import { Invoice } from "@/models/Invoice";
import { convertInvoiceToClone } from "@/utils/converter";
import InvoiceCardLoading from "./InvoiceCardLoading";

interface Props {
    invoice: Invoice | null;
}


export default function InvoiceCard({ invoice }: Props) {

    if (!invoice) {
        return null;
    }
    const clone = convertInvoiceToClone(invoice);
    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Order ID: {clone.id}
                        <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            <Copy className="h-3 w-3" />
                            <span className="sr-only">Copy Order ID</span>
                        </Button>
                    </CardTitle>
                    <CardDescription>Date: {clone.formattedCreated}</CardDescription>
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
                        {clone.items.map((item, index) => (
                            <InvoiceProduct
                                key={index}
                                name={item.name}
                                quantity={item.quantity}
                                total={item.total}
                            />
                        ))}
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>{clone.amount_subtotal ? clone.amount_subtotal : "$0.00"}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>{clone.amount_shipping ? clone.amount_shipping : "$0.00"}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span>{clone.amount_tax ? clone.amount_shipping : "$0.00"}</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                            <span className="text-muted-foreground">Total</span>
                            <span>{clone.amount_total ? clone.amount_total : "$0.00"}</span>
                        </li>
                    </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                        <div className="font-semibold">Shipping Information</div>
                        <address className="grid gap-0.5 not-italic text-muted-foreground">
                            <span>{clone.customer_details.name}</span>
                            <span>{clone.customer_details.adress.line1}</span>
                            {clone.customer_details.adress.line2 && (<span>{clone.customer_details.adress.line2}</span>)}
                            <span>{clone.customer_details.adress.city}, {clone.customer_details.adress.country} {clone.customer_details.adress.postal_code}</span>
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
                            <dd>{clone.customer_details.name}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Email</dt>
                            <dd>
                                <a href="mailto:">{clone.customer_details.email}</a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Phone</dt>
                            <dd>
                                <a href="tel:">{clone.customer_details.phone}</a>
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
    )
}

const InvoiceProduct = ({ name,  quantity, total }: { name: string, quantity: number, total: string }) => {
    return (
        <li className="flex items-center justify-between">
            <span className="text-muted-foreground">
                {name} x <span>{quantity.toString()}</span>
            </span>
            <span>{total.toString()}</span>
        </li>
    )
}