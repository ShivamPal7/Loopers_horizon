import * as React from "react"
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react"

export type CashflowEntry = {
  age: number
  openingBalance: number
  annualGrowth: number | null
  savings: number | null
  dips: number | null
  closingBalance: number
}

function formatCurrency(val: number | null, prefix = "") {
  if (val === null) return "—"
  return `${prefix}₹${val.toLocaleString("en-IN")}`
}

const columns: ColumnDef<CashflowEntry>[] = [
  {
    accessorKey: "age",
    header: () => <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Age</div>,
    cell: ({ row }) => (
      <Badge variant="secondary" className="px-3 py-1 font-bold text-sm rounded-md bg-muted">
        {row.original.age}
      </Badge>
    ),
  },
  {
    accessorKey: "openingBalance",
    header: () => <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Opening Balance</div>,
    cell: ({ row }) => (
      <div className="text-muted-foreground font-medium">
        {formatCurrency(row.original.openingBalance)}
      </div>
    ),
  },
  {
    accessorKey: "annualGrowth",
    header: () => <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Annual Growth</div>,
    cell: ({ row }) => {
      const val = row.original.annualGrowth
      return (
        <div className="font-semibold text-emerald-500 dark:text-emerald-400">
          {val !== null ? formatCurrency(val, "+") : "—"}
        </div>
      )
    },
  },
  {
    accessorKey: "savings",
    header: () => <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Savings</div>,
    cell: ({ row }) => {
      const val = row.original.savings
      return (
        <div className="font-semibold text-blue-500 dark:text-blue-400">
          {val !== null ? formatCurrency(val, "+") : "—"}
        </div>
      )
    },
  },
  {
    accessorKey: "dips",
    header: () => <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Dips (Drawdowns)</div>,
    cell: ({ row }) => {
      const val = row.original.dips
      return (
        <div className="text-muted-foreground font-medium">
          {val !== null ? formatCurrency(val, "-") : "—"}
        </div>
      )
    },
  },
  {
    accessorKey: "closingBalance",
    header: () => <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Closing Balance</div>,
    cell: ({ row }) => (
      <div className="font-bold text-foreground">
        {formatCurrency(row.original.closingBalance)}
      </div>
    ),
  },
]

export function CashflowTable({ data }: { data: CashflowEntry[] }) {
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="w-full space-y-4">
      <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-12">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="bg-background hover:bg-muted/20"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No cashflow data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
          Showing {table.getRowModel().rows.length} of {table.getCoreRowModel().rows.length} records.
        </div>
        <div className="flex w-full items-center gap-6 lg:w-fit">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
