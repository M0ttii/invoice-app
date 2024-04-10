'use client'
import { Delete, DeleteIcon, Edit, Trash } from "lucide-react";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { Switch } from "../switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../select";
import { getAccountName, getAccountPairs } from "@/app/actions";
import { Suspense, use, useEffect, useState } from "react";
import Stripe from "stripe";
import useSWR, { Fetcher } from 'swr'
import { set } from "react-hook-form";

interface AccountProps {
    name: string | null | undefined;
}

const Account = (props: AccountProps) => {
    return (
        <div className="flex justify-between w-1/2 h-10 dark:bg-[#18181B] border rounded-md">
            <div className="flex justify-start items-center pl-2 space-x-2">
                <div className="rounded-xl h-7 w-7 bg-green-300"></div>
                <Label>{props.name}</Label>
            </div>
            <div className="flex justify-end items-center pr-2">
                <Button className="dark" variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                </Button>
                <Button className="dark" variant="ghost" size="icon">
                    <Trash className="h-4 w-4 text-red-500" />
                </Button>
            </div>
        </div>
    )
}

interface AccountPair {
    account: Stripe.Account;
    key: string;
};

interface SettingsStripeProps {
    data: AccountPair[];
}


export default function SettingsStripe({ data }: SettingsStripeProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Linked Stripe Accounts</CardTitle>
                    <CardDescription>
                        Add/Remove Stripe accounts that are linked to your store.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-2">
                        <Suspense fallback={<p>Loading</p>}>

                            {data.map((pair: AccountPair, index) => (
                                <Account key={index} name={pair.account.settings?.dashboard.display_name} />
                            ))}
                        </Suspense>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button className="w-28">Add Account</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Payment Type</CardTitle>
                    <CardDescription>
                        Select if only one-time-payments are shown in the invoice list or if subscriptions are shown as well.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select payment type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Types</SelectLabel>
                                <SelectItem value="apple">Only One-Time-Payments</SelectItem>
                                <SelectItem value="banana">One-Time-Payments and Subscriptions</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button className="w-28">Add Account</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Auto Email Customers</CardTitle>
                    <CardDescription>
                        When turned on, customers will receive an email with their invoice after purchase.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2">
                        <Switch id="email" />
                        <Label htmlFor="email">Turn On Email Invoices</Label>
                    </div>

                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
