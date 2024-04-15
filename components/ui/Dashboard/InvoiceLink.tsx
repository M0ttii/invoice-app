'use client'
import { CopyIcon, ExternalLink } from "lucide-react";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { Progress } from "../progress";
import { Skeleton } from "../skeleton";
import { createClient } from "@/utils/supabase/client";
import { Suspense, useEffect, useState } from "react";

interface Props {
    userID: string | undefined;
}

const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
};

export default function InvoiceLink() {
    return (
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
                    <div className="w-full h-10 bg-white dark:bg-[#18181B] border rounded-lg text-center items-center flex p-2">
                        <LinkComponent />
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
    )
}

const LinkComponent = () => {
    'use client'
    const [userID, setUserID] = useState<string | undefined>("");
    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getSession()
            .then((session) => setUserID(session.data.session?.user.id))
            .catch(error => console.error("Fehler beim Abrufen der Session", error));
    }, []);

    return (
        userID ? (
            <>
                <div className="flex justify-start font-mono text-nowrap  sm:text-wrap text-sm text-zinc-900 dark:text-[#ffffff]/70">
                    http://localhost:3000/u/{userID}
                </div>
                <div className="flex w-full justify-end">
                    <Button className="w-8 h-8 hover:bg-zinc-100 hover:text-zinc-50 hover:bg-muted" variant="ghost" size="icon">
                        <CopyIcon className="h-4 w-4 text-zinc-900 dark:text-white" />
                    </Button>
                    <Button className="w-8 h-8 hover:bg-zinc-100 hover:text-zinc-50 hover:bg-muted" variant="ghost" size="icon">
                        <ExternalLink onClick={() => openInNewTab("http://localhost:3000/u/" + userID)} className="h-4 w-4 text-zinc-900 dark:text-white " />
                    </Button>
                </div >
            </>
        ) : (
            <Skeleton className="w-full h-5" />
        )
    );
}