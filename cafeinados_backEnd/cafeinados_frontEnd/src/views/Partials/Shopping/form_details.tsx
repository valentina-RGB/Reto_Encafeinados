"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command"
import {  CalendarIcon, CheckIcon, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "../../components/lib/utils"
import { Label } from "../../components/ui/label"
import { Calendar } from "../../components/ui/calendar"


const productos = [
  { value: "cafe-arabica", label: "Café Arábica" },
  { value: "cafe-robusta", label: "Café Robusta" },
  { value: "cafe-colombiano", label: "Café Colombiano" },
  { value: "cafe-etiope", label: "Café Etíope" },
]

export default function FormularioPaginado() {
  const [paso, setPaso] = useState(1)
  const [formData, setFormData] = useState({
    producto: "",
    precioUnitario: "",
    fechaVencimiento: undefined,
    fechaTosteo: undefined,
    cantidad: "",
  })
  const [abierto, setAbierto] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProductoSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, producto: value }))
    setAbierto(false)
  }

  const handleDateSelect = (date: Date | undefined, field: "fechaVencimiento" | "fechaTosteo") => {
    setFormData((prev) => ({ ...prev, [field]: date }))
  }

  const subtotal =
    formData.precioUnitario && formData.cantidad
      ? Number.parseFloat(formData.precioUnitario) * Number.parseFloat(formData.cantidad)
      : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos del formulario:", formData, "Subtotal:", subtotal)
    // Aquí puedes agregar la lógica para enviar los datos
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Formulario de Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {paso === 1 && (
            <>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="producto">Producto</Label>
                  <Popover open={abierto} onOpenChange={setAbierto}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={abierto}
                        className="w-full justify-between"
                      >
                        {formData.producto
                          ? productos.find((producto) => producto.value === formData.producto)?.label
                          : "Seleccione un producto..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Buscar producto..." />
                        <CommandList>
                          <CommandEmpty>No se encontró ningún producto.</CommandEmpty>
                          <CommandGroup>
                            {productos.map((producto) => (
                              <CommandItem key={producto.value} value={producto.value} onSelect={handleProductoSelect}>
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.producto === producto.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {producto.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="precioUnitario">Precio Unitario</Label>
                  <Input
                    id="precioUnitario"
                    name="precioUnitario"
                    placeholder="Ingrese el precio unitario"
                    type="number"
                    value={formData.precioUnitario}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </>
          )}
          {paso === 2 && (
            <>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.fechaVencimiento && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.fechaVencimiento ? (
                          format(formData.fechaVencimiento, "PPP", { locale: es })
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.fechaVencimiento}
                        onSelect={(date) => handleDateSelect(date, "fechaVencimiento")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="fechaTosteo">Fecha de Tosteo</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.fechaTosteo && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.fechaTosteo ? (
                          format(formData.fechaTosteo, "PPP", { locale: es })
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.fechaTosteo}
                        onSelect={(date) => handleDateSelect(date, "fechaTosteo")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="cantidad">Cantidad</Label>
                  <Input
                    id="cantidad"
                    name="cantidad"
                    placeholder="Ingrese la cantidad"
                    type="number"
                    value={formData.cantidad}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="subtotal">Subtotal</Label>
                  <Input id="subtotal" name="subtotal" value={subtotal.toFixed(2)} readOnly />
                </div>
              </div>
            </>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {paso > 1 && (
          <Button variant="outline" onClick={() => setPaso(paso - 1)}>
            Anterior
          </Button>
        )}
        {paso < 2 ? (
          <Button onClick={() => setPaso(paso + 1)}>Siguiente</Button>
        ) : (
          <Button type="submit" onClick={handleSubmit}>
            Enviar
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

