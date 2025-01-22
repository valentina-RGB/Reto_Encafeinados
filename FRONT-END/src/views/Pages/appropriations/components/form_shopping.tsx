// "use client"

// import { useState } from "react"
// import { Button } from "../../components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
// import { Input } from "../../components/ui/input"
// import { Label } from "../../components/ui/label"
// import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
// import { CheckIcon, ChevronsUpDown, PlusCircle } from "lucide-react"
// // import { cn } from "@/lib/utils"
// // import { FormularioProducto } from "./formulario-producto"

// const proveedores = [
//   { value: "proveedor1", label: "Proveedor 1" },
//   { value: "proveedor2", label: "Proveedor 2" },
//   { value: "proveedor3", label: "Proveedor 3" },
//   { value: "proveedor4", label: "Proveedor 4" },
// ]

// export function FormularioCompras() {
//   const [proveedor, setProveedor] = useState("")
//   const [abiertoProveedor, setAbiertoProveedor] = useState(false)
//   const [productos, setProductos] = useState<any[]>([])
//   const [modalAbierta, setModalAbierta] = useState(false)

//   const handleProveedorSelect = (value: string) => {
//     setProveedor(value)
//     setAbiertoProveedor(false)
//   }

//   const handleAgregarProducto = (producto: any) => {
//     setProductos([...productos, producto])
//     setModalAbierta(false)
//   }

//   const total = productos.reduce((sum, producto) => sum + Number.parseFloat(producto.subtotal), 0)

//   return (
//     <Card className="w-[800px]">
//       <CardHeader>
//         <CardTitle>Formulario de Compras</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="grid w-full items-center gap-4">
//           <div className="flex flex-col space-y-1.5">
//             <Label htmlFor="proveedor">Proveedor</Label>
//             <Popover open={abiertoProveedor} onOpenChange={setAbiertoProveedor}>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   role="combobox"
//                   aria-expanded={abiertoProveedor}
//                   className="w-full justify-between"
//                 >
//                   {proveedor ? proveedores.find((p) => p.value === proveedor)?.label : "Seleccione un proveedor..."}
//                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-[300px] p-0">
//                 <Command>
//                   <CommandInput placeholder="Buscar proveedor..." />
//                   <CommandList>
//                     <CommandEmpty>No se encontró ningún proveedor.</CommandEmpty>
//                     <CommandGroup>
//                       {proveedores.map((p) => (
//                         <CommandItem key={p.value} value={p.value} onSelect={handleProveedorSelect}>
//                           <CheckIcon
//                             className={cn("mr-2 h-4 w-4", proveedor === p.value ? "opacity-100" : "opacity-0")}
//                           />
//                           {p.label}
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </PopoverContent>
//             </Popover>
//           </div>
//           <div>
//             <Dialog open={modalAbierta} onOpenChange={setModalAbierta}>
//               <DialogTrigger asChild>
//                 <Button className="w-full">
//                   <PlusCircle className="mr-2 h-4 w-4" />
//                   Agregar Producto
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>Agregar Producto</DialogTitle>
//                 </DialogHeader>
//                 <FormularioProducto onSubmit={handleAgregarProducto} />
//               </DialogContent>
//             </Dialog>
//           </div>
//           {productos.length > 0 && (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Producto</TableHead>
//                   <TableHead>Cantidad</TableHead>
//                   <TableHead>Precio Unitario</TableHead>
//                   <TableHead>Subtotal</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {productos.map((producto, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{producto.producto}</TableCell>
//                     <TableCell>{producto.cantidad}</TableCell>
//                     <TableCell>${producto.precioUnitario}</TableCell>
//                     <TableCell>${producto.subtotal}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//           <div className="flex justify-end">
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="total">Total</Label>
//               <Input id="total" value={`$${total.toFixed(2)}`} readOnly className="w-[200px]" />
//             </div>
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="flex justify-end">
//         <Button type="submit">Finalizar Compra</Button>
//       </CardFooter>
//     </Card>
//   )
// }

