'use client';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/invoicedialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MyComponent from "./InvoiceTemplates/Temp1"
import { Invoice } from "@/models/Invoice"
import InvoiceTemplate1 from "./InvoiceTemplates/Temp1"
import { useRef } from "react"
import generatePDF from 'react-to-pdf';

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
    invoice: Invoice | null
}

type Dimensions = {
    height: number;
    width: number;
};

function scaleA4(factor: number): Dimensions {
    const A4 = { height: 297, width: 210 }; // A4 dimensions in mm

    return {
        height: A4.height * factor,
        width: A4.width * factor,
    };
}

export function InvoiceDialog({ open, setOpen, invoice }: Props) {

    const targetRef = useRef(null);
    function handleDownload(){
        generatePDF(targetRef, {filename: 'invoice.pdf'});
    }

    const height = scaleA4(1).height;
    const width = scaleA4(0.8).width;
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onDownload={handleDownload} className="min-w-fit justify-center">
                <div ref={targetRef} className="inline-block mt-10 overflow-visible">
                    <InvoiceTemplate1 invoice={invoice} height={height} width={width} />
                </div>
                {/* <div ref={targetRef} className="absolute left-[10000px]">
                    <InvoiceTemplate1 invoice={invoice} height={297} width={210} />
                </div> */}
            </DialogContent>
        </Dialog>
    )
}
