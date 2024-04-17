import { Delete, DeleteIcon, Edit, Trash } from "lucide-react";
import { Button } from "../../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../card";
import { Input } from "../../input";
import { Label } from "../../label";
import { Switch } from "../../switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../select";
import { getAccountName, getAccountPairs } from "@/app/actions";
import { Suspense, cache, use, useEffect, useState } from "react";
import Stripe from "stripe";
import useSWR, { Fetcher } from 'swr'
import { set } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";
import { Account } from "../Account";
import { LinkedAccounts } from "./LinkedAccounts";
import LinkedAccountsSuspense from "./LinkedAccountsSuspense";

export default function SettingsStripe() {
    
    return (
        <div className="grid gap-6">
            <Suspense fallback={<LinkedAccountsSuspense/>}>
                <LinkedAccounts></LinkedAccounts>
            </Suspense>
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
