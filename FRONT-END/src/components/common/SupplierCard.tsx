interface SupplierCardProps {
  name: string
  products: number
  image: string
}

export function SupplierCard({ name, products, image }: SupplierCardProps) {
  return (
    <div className="flex flex-col gap-3 pb-3">
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div>
        <p className="text-[#1C160C] text-base font-medium leading-normal">{name}</p>
        <p className="text-[#A18249] text-sm font-normal leading-normal">{products} products</p>
      </div>
    </div>
  )
}


