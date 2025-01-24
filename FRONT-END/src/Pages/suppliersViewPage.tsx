import { MicroscopeIcon as MagnifyingGlass } from "lucide-react"
import { SupplierCard } from "../components/common/SupplierCard"

const suppliers = [
  {
    name: "Vendors",
    products: 15,
    image: "https://cdn.usegalileo.ai/sdxl10/6b17849b-67f0-4f5e-b961-c41ee8f3e580.png",
  },
  {
    name: "Sunny's Kitchen",
    products: 5,
    image: "https://cdn.usegalileo.ai/sdxl10/4c563988-9d65-4c24-acd4-07136457499e.png",
  },
  {
    name: "Pioneer Coffee Roasters",
    products: 2,
    image: "https://cdn.usegalileo.ai/sdxl10/3238dfa8-a024-4525-bf6c-39b1ba358cfb.png",
  },
  {
    name: "Cafe de la Paz",
    products: 8,
    image: "https://cdn.usegalileo.ai/sdxl10/5b5133d7-8253-46dd-9daa-094024232336.png",
  },
  {
    name: "Baker's Best Breads",
    products: 12,
    image: "https://cdn.usegalileo.ai/sdxl10/d7370d97-4642-4781-ae69-a9775e13a22f.png",
  },
  {
    name: "Sunny's Kitchen",
    products: 5,
    image: "https://cdn.usegalileo.ai/sdxl10/f648ae4d-f723-47eb-b2f3-9b599cbbaca0.png",
  },
  {
    name: "Pioneer Coffee Roasters",
    products: 2,
    image: "https://cdn.usegalileo.ai/sdxl10/d40eb62c-b16f-4620-a3d9-e1ae2f7f6e3a.png",
  },
  {
    name: "Cafe de la Paz",
    products: 8,
    image: "https://cdn.usegalileo.ai/sdxl10/0b9ddf6d-d6c6-4ee7-8ece-252920005c6a.png",
  },
]

export default function SuppliersViewPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#FFFFFF] group/design-root overflow-x-hidden font-['Plus_Jakarta_Sans']">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#1C160C] text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Suppliers</p>
            </div>

            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div className="text-[#A18249] flex border-none bg-[#F4EFE6] items-center justify-center pl-4 rounded-l-xl border-r-0">
                    <MagnifyingGlass size={24} />
                  </div>
                  <input
                    placeholder="Search suppliers"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1C160C] focus:outline-0 focus:ring-0 border-none bg-[#F4EFE6] focus:border-none h-full placeholder:text-[#A18249] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  />
                </div>
              </label>
            </div>

            <h2 className="text-[#1C160C] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Tiendas
            </h2>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {suppliers.map((supplier, index) => (
                <SupplierCard key={index} name={supplier.name} products={supplier.products} image={supplier.image} />
              ))}
            </div>
          </div>
          <div className="layout-content-container flex flex-col" />
        </div>
      </div>
    </div>
  )
}

 