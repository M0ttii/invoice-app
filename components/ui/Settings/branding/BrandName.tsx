'use client'
import { ExternalLink } from "lucide-react"
import { Button } from "../../button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../card"
import { Checkbox } from "../../checkbox"
import { Input } from "../../input"
import { Label } from "../../label"
import { Separator } from "../../separator"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../dropdown-menu"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "../../use-toast"

const FormSchema = z.object({
    title: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

export const BrandName = () => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    const onInvalid = (errors: any) => console.error(errors)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="w-2/3 space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Brand Name</CardTitle>
                            <CardDescription>
                                If selected, the name you have set for your Stripe Business will be displayed on each custom store page. <br /> If not, the default title will be displayed (next option).
                            </CardDescription>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="ml-auto gap-1">Preview <ExternalLink className="w-4 h-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Preview</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer">
                                    Main Invoice Page
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    Store-specific Invoice Page
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-5">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Use Stripe's Branding
                            </label>
                        </div>
                        <Separator />
                        <div className="">
                            <CardTitle className="py-2">Title</CardTitle>
                            <CardDescription className="pb-2">
                                This title is shown when the user is accessing your <span className="text-white/80 font-semibold">main invoicing page</span>, not a specific store page or you dont use Stripe branding.
                            </CardDescription>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Example Company" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Separator />
                        <div className="">
                            <CardTitle className="py-2">Description / Slogan</CardTitle>
                            <CardDescription className="pb-2">
                                This title is shown when the user is accessing your <span className="text-white/80 font-semibold">main invoicing page</span>, not a specific store page or you dont use Stripe branding.
                            </CardDescription>
                            <Input id="picture" placeholder="Example Company" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button type="submit">Save</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}