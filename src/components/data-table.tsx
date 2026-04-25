import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { toast } from "sonner"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  GripVerticalIcon,
  CircleCheckIcon,
  EllipsisVerticalIcon,
  Columns3Icon,
  ChevronDownIcon,
  PlusIcon,
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
  AlertTriangleIcon,
  XCircleIcon,
  TrendingUpIcon,
} from "lucide-react"
import { AddGoalModal } from "@/components/add-goal-modal"

export const schema = z.object({
  id: z.number(),
  label: z.string(),
  category: z.string(),
  priority: z.string(),
  targetAge: z.number(),
  cost: z.number(),
  currentAge: z.number(),
  projectedBalance: z.number(),
  status: z.string(),
  reviewer: z.string().optional(),
})

type Milestone = z.infer<typeof schema>

function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({ id })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent cursor-grab"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

function formatCurrency(val: number) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`
  return `₹${val.toLocaleString("en-IN")}`
}

function getCategoryIcon(cat: string) {
  const map: Record<string, string> = {
    Housing: "🏠", Business: "💼", Education: "🎓",
    Family: "💒", Travel: "✈️", Retirement: "🏖️",
    Health: "🏥", Investment: "📈", Savings: "🐷", Lifestyle: "🛍️"
  }
  return map[cat] || "🎯"
}

const columns: ColumnDef<Milestone>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "label",
    header: "Milestone",
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-2 py-0.5 text-muted-foreground font-medium bg-muted/50">
        <span className="mr-1.5">{getCategoryIcon(row.original.category)}</span>
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "targetAge",
    header: "Timeline",
    cell: ({ row }) => {
      const yearsAway = row.original.targetAge - row.original.currentAge
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">Age {row.original.targetAge}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
            {yearsAway} yrs away
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "cost",
    header: () => <div className="text-right">Target Amount</div>,
    cell: ({ row }) => (
      <div className="text-right font-semibold tabular-nums">
        {formatCurrency(row.original.cost)}
      </div>
    ),
  },
  {
    accessorKey: "projectedBalance",
    header: "Progress",
    cell: ({ row }) => {
      const percent = Math.min(100, Math.max(0, (row.original.projectedBalance / row.original.cost) * 100))
      return (
        <div className="w-24">
          <div className="flex justify-between text-[10px] mb-1 font-medium">
            <span>{percent.toFixed(0)}% funded</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      let colorClass = ""
      let Icon = CircleCheckIcon

      if (status === "On Track") {
        colorClass = "text-green-600 bg-green-50 border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800"
        Icon = CircleCheckIcon
      } else if (status === "At Risk") {
        colorClass = "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800"
        Icon = AlertTriangleIcon
      } else if (status === "Critical") {
        colorClass = "text-red-600 bg-red-50 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800"
        Icon = XCircleIcon
      }

      return (
        <Badge variant="outline" className={`px-2 py-0.5 gap-1.5 font-medium ${colorClass}`}>
          <Icon className="size-3" />
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const p = row.original.priority
      const color = p === "High" ? "bg-red-500" : p === "Medium" ? "bg-amber-500" : "bg-green-500"
      return (
        <div className="flex items-center gap-1.5">
          <span className={`size-2 rounded-full ${color}`} />
          <span className="text-sm text-muted-foreground">{p}</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
            <EllipsisVerticalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit Goal</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function DraggableRow({ row }: { row: Row<Milestone> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({ id: row.original.id })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 data-[dragging=true]:shadow-lg bg-background"
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function DataTable({ data: initialData }: { data: Milestone[] }) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters, pagination },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <Tabs defaultValue="all" className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="all">All Goals <Badge variant="secondary" className="ml-1.5">{data.length}</Badge></TabsTrigger>
          <TabsTrigger value="critical">Needs Attention <Badge variant="secondary" className="ml-1.5 text-red-500">2</Badge></TabsTrigger>
          <TabsTrigger value="completed">Funded</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Columns3Icon className="mr-2 size-4" />
                Columns
                <ChevronDownIcon className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {table.getAllColumns().filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide()).map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id === "targetAge" ? "Timeline" : column.id === "projectedBalance" ? "Progress" : column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <AddGoalModal>
            <Button size="sm">
              <PlusIcon className="mr-2 size-4" />
              Add Goal
            </Button>
          </AddGoalModal>
        </div>
      </div>

      <TabsContent value="all" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 mt-4">
        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <DndContext collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd} sensors={sensors} id={sortableId}>
            <Table>
              <TableHeader className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                    {table.getRowModel().rows.map((row) => <DraggableRow key={row.id} row={row} />)}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">No milestones found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-between mt-2">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-6 lg:w-fit">
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="hidden size-8 p-0 lg:flex" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                <ChevronsLeftIcon className="size-4" />
              </Button>
              <Button variant="outline" className="size-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <ChevronLeftIcon className="size-4" />
              </Button>
              <Button variant="outline" className="size-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <ChevronRightIcon className="size-4" />
              </Button>
              <Button variant="outline" className="hidden size-8 p-0 lg:flex" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                <ChevronsRightIcon className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      
      {/* Empty tabs for demo */}
      <TabsContent value="critical" className="px-4 lg:px-6 pt-4"><div className="text-sm text-muted-foreground">Showing goals requiring attention...</div></TabsContent>
      <TabsContent value="completed" className="px-4 lg:px-6 pt-4"><div className="text-sm text-muted-foreground">Showing fully funded goals...</div></TabsContent>
    </Tabs>
  )
}

function TableCellViewer({ item }: { item: Milestone }) {
  const isMobile = useIsMobile()

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left font-semibold text-foreground hover:text-primary">
          {item.label}
        </Button>
      </DrawerTrigger>
      <DrawerContent className={isMobile ? "" : "w-[400px]"}>
        <DrawerHeader className="gap-2 text-left">
          <DrawerTitle className="text-xl flex items-center gap-2">
            {getCategoryIcon(item.category)} {item.label}
          </DrawerTitle>
          <DrawerDescription>
            Target Age: {item.targetAge} ({item.targetAge - item.currentAge} years away)
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-6 overflow-y-auto p-4 pt-2">
          
          <div className="bg-muted/40 rounded-xl p-4 space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Target Amount</div>
              <div className="text-2xl font-bold">{formatCurrency(item.cost)}</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Projected Balance</span>
                <span>{formatCurrency(item.projectedBalance)}</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all" 
                  style={{ width: `${Math.min(100, (item.projectedBalance / item.cost) * 100)}%` }} 
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>{((item.projectedBalance / item.cost) * 100).toFixed(0)}% Funded</span>
              </div>
            </div>
            
            {item.status !== "On Track" && (
              <div className={`p-3 rounded-lg text-sm border ${item.status === "Critical" ? "bg-red-50 text-red-900 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900" : "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900"}`}>
                <div className="font-semibold mb-1 flex items-center gap-1.5">
                  <TrendingUpIcon className="size-4" /> 
                  Action Required
                </div>
                Increase savings by ₹{((item.cost - item.projectedBalance) / ((item.targetAge - item.currentAge) * 12)).toFixed(0)}/mo to reach this goal on time.
              </div>
            )}
          </div>

          <form className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="label">Goal Name</Label>
              <Input id="label" defaultValue={item.label} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetAge">Target Age</Label>
                <Input id="targetAge" type="number" defaultValue={item.targetAge} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Estimated Cost (₹)</Label>
                <Input id="cost" type="number" defaultValue={item.cost} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={item.category}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Housing">🏠 Housing</SelectItem>
                    <SelectItem value="Education">🎓 Education</SelectItem>
                    <SelectItem value="Retirement">🏖️ Retirement</SelectItem>
                    <SelectItem value="Business">💼 Business</SelectItem>
                    <SelectItem value="Family">💒 Family</SelectItem>
                    <SelectItem value="Travel">✈️ Travel</SelectItem>
                    <SelectItem value="Investment">📈 Investment</SelectItem>
                    <SelectItem value="Savings">🐷 Savings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue={item.priority}>
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-4 flex gap-2">
              <Button type="button" className="w-full">Save Changes</Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
