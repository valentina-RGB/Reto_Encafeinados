import { MicroscopeIcon as MagnifyingGlass } from "lucide-react"

interface Supplier {
  id: string
  name: string
  code: string
  phone: string
  image: string
}

interface SidebarProps {
  suppliers: Supplier[]
  searchSupplier: string
  setSearchSupplier: (value: string) => void
}

export default function Sidebar({ suppliers, searchSupplier, setSearchSupplier }: SidebarProps) {
  return (
    <div className="layout-content-container flex flex-col w-80">
      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#887563] flex border-none bg-[#f4f2f0] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <MagnifyingGlass size={24} />
            </div>
            <input
              placeholder="Search for suppliers..."
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181411] focus:outline-0 focus:ring-0 border-none bg-[#f4f2f0] focus:border-none h-full placeholder:text-[#887563] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              value={searchSupplier}
              onChange={(e) => setSearchSupplier(e.target.value)}
            />
          </div>
        </label>
      </div>
      {suppliers.map((supplier) => (
        <div key={supplier.id} className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
            style={{ backgroundImage: `url(${supplier.image})` }}
          ></div>
          <div className="flex flex-col justify-center">
            <p className="text-[#181411] text-base font-medium leading-normal line-clamp-1">{supplier.name}</p>
            <p className="text-[#887563] text-sm font-normal leading-normal line-clamp-2">
              {supplier.code} | {supplier.name} | {supplier.phone}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

