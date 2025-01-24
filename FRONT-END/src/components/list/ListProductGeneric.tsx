import { useEffect, useState } from "react";
import { MicroscopeIcon as MagnifyingGlass } from "lucide-react";
import { productType, productVariant_Interface } from "../../types";
import { useProductVariantService } from "../../api/services/productVariantServices";
// import { useProductService } from "../../api/services/productServices"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

// interface CoffeeItem {
//   id: string
//   name: string
//   code: string
//   weight: string
//   image: string
//   price: number
// }

interface ProductListProps {
  coffeeItems: productType[];
  searchCoffee: string;
  setSearchCoffee: (value: string) => void;
  addToCart: (
    nombreProducto: productType,
    item: productVariant_Interface,
    cantidad: number
  ) => void;
}

export default function ListProductGeneric({
  coffeeItems,
  searchCoffee,
  setSearchCoffee,
  addToCart,
}: ProductListProps) {
  const [variant, setvariant] = useState<productVariant_Interface[]>([]);

  const { getAll } = useProductVariantService();

  useEffect(() => {
    fetchCoffeeItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCoffeeItems = async () => {
    try {
      const response = await getAll();
      setvariant(response);
    } catch (error) {
      console.error("Error fetching coffee items:", error);
    }
  };
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const updateQuantity = (itemId: number, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: newQuantity, // Limita entre 1 y la cantidad disponible
    }));

    console.log(quantities, coffeeItems);
  };

  const [date, setDate] = useState<Date | undefined>(new Date());
  const handleAddToCart = (
    nombreProducto: productType,
    item: productVariant_Interface,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    const quantity = quantities[item.idVariante] || 1; // Usa el idProducto para acceder a la cantidad
   
   
    
   
    console.log("hola", id);
    e.preventDefault();

    if(!date){
      alert("Este campo es obligatorio")
      return
    }

    

    addToCart(nombreProducto, item, quantity);
    setQuantities((prev) => ({ ...prev, [item.idVariante]: 1 })); // Reinicia la cantidad a 1 después de añadir al carrito
  };

 



  return (
    <div className="layout-content-container flex flex-col w-full">
      <div className="flex flex-wrap justify-between gap-3 mb-4">
        <p className="text-[#181411] tracking-light text-[32px] font-bold leading-tight min-w-72">
          Productos
        </p>
      </div>
      <div className="mb-4">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#887563] flex border-none bg-[#f4f2f0] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <MagnifyingGlass size={24} />
            </div>
            <input
              placeholder="Search for coffee..."
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181411] focus:outline-0 focus:ring-0 border-none bg-[#f4f2f0] focus:border-none h-full placeholder:text-[#887563] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              value={searchCoffee}
              onChange={(e) => setSearchCoffee(e.target.value)}
            />
          </div>
        </label>
      </div>
      <div className="space-y-4">
        <Accordion type="single" collapsible className="mb-6">
          {coffeeItems.map((product) => (
            <AccordionItem
              key={product.idProducto}
              value={product.idProducto.toString()}
            >
              <AccordionTrigger className="text-xl text-brown-700">
                {product.nombreProducto}
              </AccordionTrigger>
              <AccordionContent>
                {variant
                  .filter(
                    (variety) => variety.idProducto === product.idProducto
                  )
                  .map((variety) => (
                    <ul key={variety.idVariante}>
                      <li
                        className="flex justify-between items-center py-2 border-b border-orange-200"
                      >
                        <span>{variety.gramaje} g</span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2 text-[#181411]">
                            <button
                              className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f2f0] cursor-pointer"
                              onClick={() =>
                                updateQuantity(
                                  variety.idVariante,
                                  (quantities[variety.idVariante] || 1) - 1
                                )
                              }
                            >
                              -
                            </button>
                            <input
                              className="text-base font-medium leading-normal w-8 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                              type="number"
                              value={quantities[variety.idVariante] || 1}
                              onChange={(e) =>
                                updateQuantity(
                                  variety.idVariante,
                                  Number.parseInt(e.target.value) || 1
                                )
                              }
                              min="1"
                            />
                            <button
                              className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f2f0] cursor-pointer"
                              onClick={() =>
                                updateQuantity(
                                  variety.idVariante,
                                  (quantities[variety.idVariante] || 1) + 1
                                )
                              }
                            >
                              +
                            </button>
                            <Popover>
                            <PopoverTrigger asChild>
                              <Button
                             
                                variant="outline"
                                className="bg-[#e68019] text-white px-4 py-2 rounded-xl text-sm font-bold"
                              >
                                Registrar
                              </Button>
                            </PopoverTrigger>
                             <PopoverContent className="w-96">
                              <form
                                onSubmit={(e) => { handleAddToCart(product, variety, e)}}
                                className=""
                                  >
                                  <Calendar
                                  mode="single"

                                  selected={date}
                                  onSelect={setDate}
                                  // filterDate={(date) => date >= new Date()} // Desactiva fechas pasadas
                                  key={date?.toString()}
                                  className="rounded-md border shadow w-100  "
                                />
                                <div className="space-y-2">
                                  {/* <h4 className="font-medium leading-none">{nombreProducto}</h4> */}
                                  <p className="text-sm text-muted-foreground">
                                    Completa los campos para agregar una nueva
                                    variante.
                                  </p>
                                 
                                </div>
                            
                                {/* Botón para enviar */}
                                <Button
                                  type="submit"
                                  variant="default"
                                  className="mt-4 mx-auto bg-cafe-500 text-white file:font-semibold
                hover:bg-cafe-600"
                                >
                                  Guardar variante
                                </Button>
                              </form>
                            </PopoverContent>
                           
                          </Popover>
                          </div>
                          
                          
                        </div>
                      </li>
                    </ul>
                  ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
