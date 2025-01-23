"use client"

import { useState, useEffect } from "react"
import Header from "../components/common/Header"
import ProductList from "../components/list/productListSales"
import Cart from "../components/common/cart"
import { SupplierSelect } from "../components/common/SupplierSelect"

interface CoffeeItem {
  id: string
  name: string
  code: string
  weight: string
  image: string
  price: number
}

interface CartItem extends CoffeeItem {
  quantity: number
}

export default function ShopPage() {
  const [coffeeItems, setCoffeeItems] = useState<CoffeeItem[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [searchCoffee, setSearchCoffee] = useState("")

  useEffect(() => {
    fetchCoffeeItems()
  }, [])

  const fetchCoffeeItems = async () => {
    try {
      const response = await fetch("/api/coffee-items")
      const data = await response.json()
      setCoffeeItems(data)
    } catch (error) {
      console.error("Error fetching coffee items:", error)
    }
  }

  const addToCart = (item: CoffeeItem, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem,
        )
      } else {
        return [...prevItems, { ...item, quantity }]
      }
    })
  }

  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const filteredCoffeeItems = coffeeItems.filter((item) => item.name.toLowerCase().includes(searchCoffee.toLowerCase()))

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Epilogue, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="gap-48 px-1 flex flex-1 justify-center py-6">
          <div className="flex flex-col w-[480px]">
            <div className="mb-6">
              <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] mb-2">
                Select Supplier
              </h3>
              <SupplierSelect />
            </div>
            <ProductList
              coffeeItems={filteredCoffeeItems}
              searchCoffee={searchCoffee}
              setSearchCoffee={setSearchCoffee}
              addToCart={addToCart}
            />
          </div>
          
          <Cart cartItems={cartItems} updateCartItemQuantity={updateCartItemQuantity} removeFromCart={removeFromCart} />
        </div>
      </div>
    </div>
  )
}

