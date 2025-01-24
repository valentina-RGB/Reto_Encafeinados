"use client";

import * as React from "react";
import {ColumnDef, SortingState,useReactTable, getCoreRowModel,  getPaginationRowModel, getSortedRowModel, getFilteredRowModel,
} from "@tanstack/react-table";

import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

import { useSupplierLService } from "../../api/services/supplierLiquidation";
import { supplierLiquidationType } from "../../types";

import { RegistrarProveedorModal } from "./supplierModal";
import { RegistrarAbonoModal } from "./depositModal";
import { DetalleProveedorModal } from "./detailSupplier";
import { useSupplierService } from "../../api/services/supplier";
import { useDepositSupplierService } from "../../api/services/depositSupplier";

export function SuppliersPage() {
  const [data, setData] = React.useState<supplierLiquidationType[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Modal states
  const [registrarProveedorModal, setRegistrarProveedorModal] = React.useState(false);
  const [abonarModal, setAbonarModal] = React.useState(false);
  const [verDetalleModal, setVerDetalleModal] = React.useState(false);

  // Form states
  const [selectedSupplier, setSelectedSupplier] = React.useState<any | null>(null);

  const { getAll } = useSupplierLService();
  const { getById: getSupplierById } = useSupplierService();

  const { getAll: getDepositById } = useDepositSupplierService();

  const fetchData = React.useCallback(async () => {
    try {
        setLoading(true);
        const result = await getAll(); // Obtiene la lista base de liquidaciones y proveedores
        const deposit = await getDepositById(); // Total de abonos

        const suppliers = await Promise.all(
            result.map(async (item) => {
                const supplier = await getSupplierById(item.idProveedor); // Detalles del proveedor

                console.log(deposit);
                return {
                    ...item,
                    nombreProveedor: supplier.nombreProveedor,
                    abonos: deposit.find(d => d.idProveedor === item.idProveedor)?.abonos || 0, // Si no hay abonos, usa 0
                };
            })
        );

        setData(suppliers);
    } catch (err) {
        console.error(err);
        setError("Ocurrió un error al cargar los datos.");
    } finally {
        setLoading(false);
    }
}, [getAll, getSupplierById, getDepositById]);
 

  React.useEffect(() => {
    fetchData();
  }, []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns: ColumnDef<supplierLiquidationType>[] = [
    {
      accessorKey: "nombreProveedor",
      header: "Proveedor",
    },
    {
      accessorKey: "abonos",
      header: "Total Abonos",
      cell: ({ row }) => {
        const abonos = Number(row.original.abonos);
        return <span>{isNaN(abonos) ? "$0.00" : abonos.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</span>;
      },
    },
    {
      accessorKey: "deudaActual",
      header: "Deuda Actual",
      cell: ({ row }) => {
        const deudaActual = Number(row.original.deudaActual);
        return <span>{isNaN(deudaActual) ? "$0.00" : deudaActual.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</span>;
      },
    },
    {
      accessorKey: "estadoLiquidacion",
      header: "Estado",
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.estadoLiquidacion === "PAGADA"
              ? "default"
              : row.original.estadoLiquidacion === "PENDIENTE"
              ? "secondary"
              : "destructive"
          }
        >
          {row.original.estadoLiquidacion}
        </Badge>
      ),
    },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex space-x-2 justify-center">
          <Button
            variant="outline"
            className="border-[#c8a78f] text-[#5c412d] hover:bg-amber-100" 
            onClick={() => {
              setSelectedSupplier(row.original);
              setAbonarModal(true);
            }}
          >
            Registrar Abono
          </Button>
          <Button
            variant="outline"
            className="border-[#c8a78f] text-[#5c412d] hover:bg-amber-100" 
            onClick={() => {
              setSelectedSupplier(row.original);
              setVerDetalleModal(true);
            }}
          >
            Ver Detalle
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter },
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Buscador y Botón Registrar Proveedor */}
      <div className="mb-4 flex w-full items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setRegistrarProveedorModal(true)}
          className="border-[#c8a78f] text-[#5c412d] hover:bg-amber-100"
        >
          Registrar Proveedor
        </Button>
        <Input
          placeholder="Buscar..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm border-[#c8a78f] focus:border-border-[#c8a78f] focus:ring-amber-500"
        />
      </div>

      {/* Tabla */}
      <div className="w-full max-w-6xl rounded-md border-[#c8a78f] focus:border-border-[#c8a78f]  border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center text-[#5c412d]">
                    {header.isPlaceholder
                      ? null
                      : typeof header.column.columnDef.header === "function"
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
                    <TableCell key={cell.id} className="text-center">
                      {typeof cell.column.columnDef.cell === "function"
                        ? cell.column.columnDef.cell(cell.getContext())
                        : cell.getValue()}
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

      {/* Paginación */}
      <div className="flex items-center justify-end space-x-2 py-4   text-[#5c412d]">
        <Button
          variant="outline"
          size="sm"
          className="border-[#c8a78f] text-[#5c412d] hover:bg-amber-100"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-[#c8a78f] text-[#5c412d] hover:bg-amber-100"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>

      {/* Modals */}
      <RegistrarProveedorModal
        visible={registrarProveedorModal}
        onHide={() => setRegistrarProveedorModal(false)}
        onSuccess={fetchData}
      />

      {selectedSupplier && (
        <>
          <RegistrarAbonoModal
            visible={abonarModal}
            onHide={() => setAbonarModal(false)}
            onSuccess={fetchData}
            supplier={selectedSupplier}
          />

          <DetalleProveedorModal
            visible={verDetalleModal}
            onHide={() => setVerDetalleModal(false)}
            supplier={selectedSupplier}
          />
        </>
      )}
    </div>
  );
}