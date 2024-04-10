'use client'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Provider } from "@supabase/supabase-js"
import { useState } from "react"
import { signInWithOAuth } from "@/utils/auth-helpers/client"

type OAuthProviders = {
    name: Provider;
    displayName: string;
    icon: JSX.Element;
};

export default function LoginPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true); // Disable the button while the request is being handled
        await signInWithOAuth(e);
        setIsSubmitting(false);
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => handleSubmit(e)}>

                        <div className="grid gap-4">
                        <input type="hidden" name="provider" value={'github'} />
                            <Button type="submit" variant="outline" className="w-full">
                                Sign up with GitHub
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}