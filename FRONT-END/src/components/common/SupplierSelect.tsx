"use client"
import React,{useState, useEffect} from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../../components/lib/utils"
import { Button } from "../../components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { useSupplierService } from "../../api/services/supplier"
import {supplierType} from "../../types/supplierType"
// interface Supplier {
//   value: string
//   label: string
// }

// const suppliers: Supplier[] = [
//   { value: "joes_coffee", label: "Joe's Coffee" },
//   { value: "janes_coffee", label: "Jane's Coffee" },
//   { value: "jacks_coffee", label: "Jack's Coffee" },
// ]

export function SupplierSelect() {
  const [open, setOpen] = React.useState(false)
  const [value, setvalue] = React.useState<string>("")
  const [data, setData] = useState<supplierType[]>([])
  const {getAll} = useSupplierService()

    useEffect(() => {
      fetchCoffeeItems()
    }, [])
  
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
          {value ? data.find((supplier) => supplier.nombreProveedor === value)?.nombreProveedor : "Select supplier..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search supplier..." />
          <CommandList>
            <CommandEmpty>No supplier found.</CommandEmpty>
            <CommandGroup>
              {data.map((supplier) => (
                <CommandItem
                  key={supplier.idProveedor}
                  value={supplier.nombreProveedor}
                  onSelect={(currentValue) => {
                    setvalue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === supplier.nombreProveedor ? "opacity-100" : "opacity-0")} />
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

