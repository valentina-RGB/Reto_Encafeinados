import { MicroscopeIcon as MagnifyingGlass, ArrowLeft } from "lucide-react"

interface CoffeeItem {
  id: string
  name: string
  code: string
  weight: string
  image: string
  quantity: number
}

interface CoffeeListProps {
  coffeeItems: CoffeeItem[]
  searchCoffee: string
  setSearchCoffee: (value: string) => void
  updateQuantity: (id: string, newQuantity: number) => void
}

export default function CoffeeList({ coffeeItems, searchCoffee, setSearchCoffee, updateQuantity }: CoffeeListProps) {
  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#181411] tracking-light text-[32px] font-bold leading-tight min-w-72">New Consignment</p>
      </div>
      <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Add items to consignment
      </h3>
      <div className="px-4 py-3">
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
      {coffeeItems.map((item) => (
        <div key={item.id} className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-[#181411] text-base font-medium leading-normal line-clamp-1">{item.name}</p>
              <p className="text-[#887563] text-sm font-normal leading-normal line-clamp-2">
                {item.code} | {item.name} | {item.weight}
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <div className="flex items-center gap-2 text-[#181411]">
              <button
                className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f2f0] cursor-pointer"
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
              >
                -
              </button>
              <input
                className="text-base font-medium leading-normal w-4 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 0)}
              />
              <button
                className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f2f0] cursor-pointer"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex px-4 py-3">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#e68019] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="truncate">Finalize Consignment</span>
        </button>
      </div>
      <div className="flex px-4 py-3">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#f4f2f0] text-[#181411] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]">
          <ArrowLeft size={20} />
          <span className="truncate">Cancel</span>
        </button>
      </div>
    </div>
  )
}

