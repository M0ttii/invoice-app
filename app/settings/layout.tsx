import CustomLink from "@/components/ui/Settings/CustomLink";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    const ids = [{ id: '1' }, { id: '2' }, { id: '3' }];

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground">
                        <CustomLink path="/settings" item={{text: "Personal", slug: "personal"}}></CustomLink>
                        <CustomLink path="/settings" item={{text: "Stripe", slug: "stripe"}}></CustomLink>
                        <CustomLink path="/settings" item={{text: "Branding", slug: "branding"}}></CustomLink>
                    </nav>
                    <div className="">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}