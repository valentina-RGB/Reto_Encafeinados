
import { useState } from "react"
import { MicroscopeIcon as MagnifyingGlass } from "lucide-react"
import { productType } from "../../types"
// interface CoffeeItem {
//   id: string
//   name: string
//   code: string
//   weight: string
//   image: string
//   price: number
// }

interface ProductListProps {
  coffeeItems: productType[]
  searchCoffee: string
  setSearchCoffee: (value: string) => void
  addToCart: (item: productType, cantidad: number) => void
}

export default function ProductList({ coffeeItems, searchCoffee, setSearchCoffee, addToCart }: ProductListProps) {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setQuantities((prev) => ({ ...prev, [itemId]: Math.max(1, newQuantity) }))
  }

  const handleAddToCart = (item: productType) => {
    const quantity = quantities[item.cantidad] || 1
    addToCart(item, quantity)
    setQuantities((prev) => ({ ...prev, [item.cantidad]: 1 }))
  }

  return (
    <div className="layout-content-container flex flex-col w-full">
      <div className="flex flex-wrap justify-between gap-3 mb-4">
        <p className="text-[#181411] tracking-light text-[32px] font-bold leading-tight min-w-72">Coffee Shop</p>
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
        {coffeeItems.map((item) => (
          <div
            key={item.idProducto}
            className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between rounded-xl border border-[#f4f2f0]"
          >
            <div className="flex items-center gap-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-10"
                style={{ backgroundImage: `url(${item.imagenProducto})` }}
              ></div>
              <div className="flex flex-col justify-center">
                <p className="text-[#181411] text-base font-medium leading-normal line-clamp-2">{item.nombreProducto}</p>
                {/* <p className="text-[#887563] text-sm font-normal leading-normal line-clamp-2">
                  {item.code} | {item.weight}
                </p> */}
                <p className="text-[#181411] text-sm font-bold leading-normal">${item.categoria}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-[#181411]">
                <button
                  className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f2f0] cursor-pointer"
                  onClick={() => updateQuantity(item.idProducto, (quantities[item.cantidad] || 1) - 1)}
                >
                  -
                </button>
                <input
                  className="text-base font-medium leading-normal w-8 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  type="number"
                  value={quantities[item.cantidad] || 1}
                  onChange={(e) => updateQuantity(item.idProducto, Number.parseInt(e.target.value) || 1)}
                  min="1"
                />
                <button
                  className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f2f0] cursor-pointer"
                  onClick={() => updateQuantity(item.idProducto, (quantities[item.cantidad] || 1) + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-[#e68019] text-white px-4 py-2 rounded-xl text-sm font-bold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

