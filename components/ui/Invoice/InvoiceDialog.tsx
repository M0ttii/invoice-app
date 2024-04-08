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

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

export function InvoiceDialog({ open, setOpen }: Props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="min-w-fit h-screen justify-center ">
                <div className="inline-block">
                    <MyComponent />
                </div>
            </DialogContent>
        </Dialog>
    )
}
