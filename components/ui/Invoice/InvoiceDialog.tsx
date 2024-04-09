import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MyComponent from "./InvoiceTemplates/Temp1"
import { Invoice } from "@/models/Invoice"
import InvoiceTemplate1 from "./InvoiceTemplates/Temp1"

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    invoice: Invoice | null
}

export function InvoiceDialog({ open, setOpen, invoice }: Props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="min-w-fit h-screen justify-center ">
                <div className="inline-block">
                    <InvoiceTemplate1 invoice={invoice} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
