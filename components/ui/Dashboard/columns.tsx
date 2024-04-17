import { ColumnDef } from "@tanstack/react-table"

export type InvoiceTableEntity = {
    id: string,
    amount_total?: number | null,
    created: number,
    currency: string | null,
    customer_name: string,
    customer_email: string,
}

export const columns: ColumnDef<InvoiceTableEntity>[] = [
    {
        accessorKey: "customer_name",
        header: "Customer",
    },
    {
        accessorKey: "business",
        header: "Business",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "created",
        header: "Date",
    },
    {
        accessorKey: "amount_total",
        header: "Amount",
    },

]