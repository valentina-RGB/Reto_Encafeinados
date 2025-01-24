"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Button } from "../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Badge } from "../components/ui/badge"

// Tipo para los datos del proveedor
type Proveedor = {
  id: number
  nombre: string
  totalAbonos: number
  deudaActual: number
  estado: "Pagado" | "Pendiente" | "Atrasado"
}

// Datos de ejemplo
const proveedores: Proveedor[] = [
  { id: 1, nombre: "Café Excelso", totalAbonos: 5000, deudaActual: 2000, estado: "Pendiente" },
  { id: 2, nombre: "Lácteos La Vaca Feliz", totalAbonos: 3000, deudaActual: 0, estado: "Pagado" },
  { id: 3, nombre: "Azúcar Dulce Vida", totalAbonos: 2000, deudaActual: 4000, estado: "Atrasado" },
]

export default function ProveedoresPage() {
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(null)

  const handleRegistrarAbono = (id: number) => {
    console.log(`Registrar abono para el proveedor con ID: ${id}`)
    // Aquí iría la lógica para registrar el abono
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Pagos a Proveedores</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Proveedor</TableHead>
            <TableHead>Total Abonos</TableHead>
            <TableHead>Deuda Actual</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proveedores.map((proveedor) => (
            <TableRow key={proveedor.id}>
              <TableCell>{proveedor.nombre}</TableCell>
              <TableCell>${proveedor.totalAbonos.toFixed(2)}</TableCell>
              <TableCell>${proveedor.deudaActual.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    proveedor.estado === "Pagado"
                      ? "default"
                      : proveedor.estado === "Pendiente"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {proveedor.estado}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button onClick={() => handleRegistrarAbono(proveedor.id)}>Registrar Abono</Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setSelectedProveedor(proveedor)}>
                        Ver Detalle
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Detalle del Proveedor</DialogTitle>
                      </DialogHeader>
                      {selectedProveedor && (
                        <div>
                          <p>
                            <strong>Nombre:</strong> {selectedProveedor.nombre}
                          </p>
                          <p>
                            <strong>Total Abonos:</strong> ${selectedProveedor.totalAbonos.toFixed(2)}
                          </p>
                          <p>
                            <strong>Deuda Actual:</strong> ${selectedProveedor.deudaActual.toFixed(2)}
                          </p>
                          <p>
                            <strong>Estado:</strong> {selectedProveedor.estado}
                          </p>
                          {/* Aquí puedes agregar más detalles si es necesario */}
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

