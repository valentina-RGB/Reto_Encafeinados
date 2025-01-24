"use client"

import { useState, useEffect } from "react"

// import ProductList from "../components/list/ProductListSales"
import Cart from "../components/common/Cart"
import { SupplierSelect } from "../components/common/SupplierSelect"
// import { useSupplierService } from "../api/services/supplier"
// import { supplierType } from "../types"
import { productType , productVariant_Interface} from "../types"
import { useProductService } from "../api/services/productServices"
import ListProductGeneric from "../components/list/ListProductGeneric"
// interface CoffeeItem {
//   id: string
//   name: string
//   code: string
//   weight: string
//   image: string
//   price: number
// }

interface CartItem extends productVariant_Interface{
  idProducto: number
  idProveedor:number
  idVariante: number
  cantidad: number
}
// interface CartProducto extends productVariant_Interface{
//   idProduct: number
// }

export default function ShopPage() {
  const [coffeeItems, setCoffeeItems] = useState<productType[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  // const [cartProducts, setProducts] = useState<Car[]>([])
  const [searchCoffee, setSearchCoffee] = useState("")
  const {getAll} = useProductService()

  useEffect(() => {
    fetchCoffeeItems()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCoffeeItems = async () => {
    try {
      const response = await getAll()
      setCoffeeItems(response)
    } catch (error) {
      console.error("Error fetching coffee items:", error)
    }
  }

  const addToCart = ( nombreProducto:productType,  item:productVariant_Interface, cantidad: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.idVariante === item.idVariante)
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.idVariante === item.idVariante? { ...cartItem, datosProducto:nombreProducto, cantidad:cartItem.cantidad + cantidad } : cartItem,
        )
      } else {
        return [...prevItems, { ...item, cantidad }]
      }
    })
  }

  const updateCartItemQuantity = (itemId: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.idVariante === itemId ? { ...item, cantidad: newQuantity } : item)),
    )
  }

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.idVariante !== itemId))
  }

  const filteredCoffeeItems = coffeeItems.filter((item) => item.nombreProducto.toLowerCase().includes(searchCoffee.toLowerCase()))

  const proveedor = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, idProveedor: id }))
    );
  };

  
  return (
    <div
      // className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      // style={{ fontFamily: 'Epilogue, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-48 px-1 flex flex-1 justify-center py-6">
          <div className="flex flex-col w-[480px]">
            <div className="mb-6">
              <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] mb-2">
                Proveedores
              </h3>
              <SupplierSelect idProveedor={proveedor} />
            </div>
            <ListProductGeneric
               coffeeItems={filteredCoffeeItems}
               searchCoffee={searchCoffee}
               setSearchCoffee={setSearchCoffee}
               addToCart={addToCart}
            ></ListProductGeneric>
            {/* <ProductList
              coffeeItems={filteredCoffeeItems}
              searchCoffee={searchCoffee}
              setSearchCoffee={setSearchCoffee}
              addToCart={addToCart}
            /> */}
          </div>
          
          <Cart cartItems={cartItems} DataProduct={coffeeItems}  updateCartItemQuantity={updateCartItemQuantity} removeFromCart={removeFromCart} />
        </div>
      </div>
    </div>
  )
}

