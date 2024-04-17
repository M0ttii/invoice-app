import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableBody, TableCell, TableCell, TableHead, TableHead, TableHead, TableHeader, TableRow } from "../table"
import { Skeleton } from "../skeleton"
import { InvoiceTableEntity } from "./columns"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    loading: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    loading,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">
                        Business
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                        Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                        Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            {loading && (
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={5}>
                            <Skeleton className="h-6 min-w-full" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={5}>
                            <Skeleton className="h-6 w-full" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            )}
            {!loading && (
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}



                    {sessions.map((session, index) => (
                        <TableRow onClick={() => onSelectInvoice(session)} className="dark:bg-[#18181B] hover:z-100 hover:cursor-pointer transition ease-in-out delay-50 hover:scale-[1.01] duration-300" key={index}>
                            <TableCell className="">
                                <div className="font-medium">{session.customer_details?.name}</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    {session.customer_details?.email}
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                Sale
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <Badge className="text-xs" variant="secondary">
                                    {session.status?.toString()}
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {session.created?.toString()}
                            </TableCell>
                            <TableCell className="text-right">{session.amount_total?.toExponential()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            )}

        </Table>
    )
}