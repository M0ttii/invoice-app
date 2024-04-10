'use client'
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import { Button } from "../button";
import { useEffect, useState } from "react";
import SettingsPersonal from "./SettingsPersonal";
import SettingsStripe from "./SettingsStripe";
import SettingsBranding from "./SettingsBranding";
import { useSearchParams } from "next/navigation";

enum Section {
    Personal,
    Stripe,
    Branding,
}

interface SettingsProps{
    data: any;

}


export default function Settings({data}: SettingsProps) {
    const searchParams = useSearchParams()
    const [section, setSection] = useState(Section.Personal)

    useEffect(() => {
        if (searchParams.has('section')) {
            const section = searchParams.get('section')
            if (section === 'stripe') {
                setSection(Section.Stripe)
            } else if (section === 'branding') {
                setSection(Section.Branding)
            } else {
                setSection(Section.Personal)
            }
        }
    }, [searchParams])

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground">
                        <Link href="?section=personal" onClick={() => setSection(Section.Personal)} className={section === Section.Personal ? "font-semibold text-primary" : ""}>
                            Personal
                        </Link>
                        <Link href="?section=stripe" onClick={() => setSection(Section.Stripe)} className={section === Section.Stripe ? "font-semibold text-primary" : ""}>Stripe</Link>
                        <Link href="?section=branding" onClick={() => setSection(Section.Branding)} className={section === Section.Branding ? "font-semibold text-primary" : ""}>Branding</Link>
                    </nav>
                    {section === Section.Personal && (
                        <div>
                            <SettingsPersonal />
                        </div>
                    )}
                    {section === Section.Stripe && (
                        <div>
                            <SettingsStripe data={data}/>
                        </div>
                    )}
                    {section === Section.Branding && (
                        <div>
                            <SettingsBranding/>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
                    