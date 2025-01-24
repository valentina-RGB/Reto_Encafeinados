"use client"

import * as React from "react"
import {
  ColumnDef,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table"

import { Button } from "../components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Badge } from "../components/ui/badge"

// Tipo de proveedor
export type Proveedor = {
  id: number
  nombre: string
  totalAbonos: number
  deudaActual: number
  estado: "Pagado" | "Pendiente" | "Atrasado"
}

// Datos de ejemplo
const data: Proveedor[] = [
  { id: 1, nombre: "Café Excelso", totalAbonos: 5000, deudaActual: 2000, estado: "Pendiente" },
  { id: 2, nombre: "Lácteos La Vaca Feliz", totalAbonos: 3000, deudaActual: 0, estado: "Pagado" },
  { id: 3, nombre: "Azúcar Dulce Vida", totalAbonos: 2000, deudaActual: 4000, estado: "Atrasado" },
]

// Definición de columnas
const columns: ColumnDef<Proveedor>[] = [
  {
    accessorKey: "nombre",
    header: "Proveedor",
    cell: ({ row }) => <span>{row.original.nombre}</span>,
  },
  {
    accessorKey: "totalAbonos",
    header: "Total Abonos",
    cell: ({ row }) => <span>${row.original.totalAbonos.toFixed(2)}</span>,
  },
  {
    accessorKey: "deudaActual",
    header: "Deuda Actual",
    cell: ({ row }) => <span>${row.original.deudaActual.toFixed(2)}</span>,
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.estado === "Pagado"
            ? "default"
            : row.original.estado === "Pendiente"
            ? "secondary"
            : "destructive"
        }
      >
        {row.original.estado}
      </Badge>
    ),
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button onClick={() => console.log(`Registrar abono para ${row.original.nombre}`)}>
          Registrar Abono
        </Button>
        <Button
          variant="outline"
          onClick={() => console.log(`Ver detalles de ${row.original.nombre}`)}
        >
          Ver Detalle
        </Button>
      </div>
    ),
  },
]

export function SuppliersPage() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : typeof header.column.columnDef.header === 'function'
                      ? header.column.columnDef.header(header.getContext())
                      : header.column.columnDef.header}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {/* {cell.column.columnDef.cell?.({
                        row: cell.row,
                      })} */}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
