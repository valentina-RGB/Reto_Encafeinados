"use client"
import React,{useState, useEffect} from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../../components/lib/utils"
import { Button } from "../../components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { useSupplierService } from "../../api/services/supplier"
import {supplierType, productVariant_Interface} from "../../types"



interface SupplierProps {
  // cartItems: productVariant_Interface[];
  idProveedor: (id:number, variant:productVariant_Interface[]) => void;
}
export function SupplierSelect({
 idProveedor
}:SupplierProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setvalue] = React.useState<string>("")
  const [data, setData] = useState<supplierType[]>([])
  const {getAll} = useSupplierService()


  
    useEffect(() => {
      fetchCoffeeItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
      idProveedor(Number(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value])
  
    const fetchCoffeeItems = async () => {
      try {
        const response = await getAll()
        setData(response)
      } catch (error) {
        console.error("Error fetching coffee items:", error)
      }
    }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? data.find((supplier) => supplier.nombreProveedor === value)?.nombreProveedor : "Seleccionar proveedor..."}
          <ChevronsUpDown className="ml-2 h-5 w-auto shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar proveedor..." />
          <CommandList>
            <CommandEmpty>No se encontro el proveedor.</CommandEmpty>
            <CommandGroup>
              {data.map((supplier: supplierType) => (
                <CommandItem
                  key={supplier.idProveedor}
                  value={supplier.nombreProveedor}
                  onSelect={(currentValue) => {
                    setvalue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    
                  }}
                >
                  <Check className={cn("mr-2 h-5 w-auto", value === supplier.nombreProveedor ? "opacity-100" : "opacity-0")} />
                  {supplier.nombreProveedor}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

