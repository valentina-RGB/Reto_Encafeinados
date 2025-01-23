"use client"

import { useState } from "react"
import ProductItem from "./productItem"

const initialProducts = [
  {
    id: 1,
    name: "Colombia La Esperanza",
    description: "12oz bag of beans",
    image: "https://cdn.usegalileo.ai/sdxl10/3345527e-3336-41f6-8538-c1fc5b1a95a9.png",
    price: 15.99,
  },
  {
    id: 2,
    name: "Costa Rica Las Lajas",
    description: "12oz bag of beans",
    image: "https://cdn.usegalileo.ai/sdxl10/053d8913-3c91-4627-bc29-90c31a21aaa2.png",
    price: 17.99,
  },
  {
    id: 3,
    name: "Instant Coffee",
    description: "8oz jar of instant coffee",
    image: "https://cdn.usegalileo.ai/sdxl10/fd47b490-0364-40ff-8006-24f01159f013.png",
    price: 9.99,
  },
  {
    id: 4,
    name: "Cold Brew Concentrate",
    description: "16oz glass bottle",
    image: "https://cdn.usegalileo.ai/sdxl10/69c4fdde-58e3-4ca4-a005-a066c0882c53.png",
    price: 14.99,
  },
  {
    id: 5,
    name: "Breakfast Blend",
    description: "12oz bag of ground coffee",
    image: "https://cdn.usegalileo.ai/sdxl10/65941351-7663-4ae0-a690-bf4fd4aa325e.png",
    price: 13.99,
  },
]

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products] = useState(initialProducts)

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 3)

  return (
    <>
      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#9a6c4c] flex border-none bg-[#f3ece7] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              placeholder="Search for products"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b130d] focus:outline-0 focus:ring-0 border-none bg-[#f3ece7] focus:border-none h-full placeholder:text-[#9a6c4c] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </label>
      </div>
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </>
  )
}

