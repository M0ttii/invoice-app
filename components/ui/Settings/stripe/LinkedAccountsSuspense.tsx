import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../card";
import { Button } from "../../button";
import { Skeleton } from "../../skeleton";
import { ClipLoader } from "react-spinners";

export default function LinkedAccountsSuspense() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Linked Stripe Accounts</CardTitle>
                <CardDescription>
                    Add/Remove Stripe accounts that are linked to your store.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ClipLoader color="#ffffff" className="animate-spin text-white"/>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button className="w-28" disabled>Add Account</Button>
            </CardFooter>
        </Card>
    )
}