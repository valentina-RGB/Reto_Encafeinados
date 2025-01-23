"use client"

import { useState } from "react"
// import Image from "next/image"
import Modal from "../../components/common/Modal"


interface ProductItemProps {
  name: string
  description: string
  price: number
}

export default function ProductItem({ name, description, price }: ProductItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [profitPercentage, setProfitPercentage] = useState("")
  const [finalPrice, setFinalPrice] = useState(0)

  const handleAddClick = () => {
    setIsModalOpen(true)
  }

  const handleProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setProfitPercentage(value)
    const percentage = Number.parseFloat(value) || 0
    const calculatedPrice = price * (1 + percentage / 100)
    setFinalPrice(Number.parseFloat(calculatedPrice.toFixed(2)))
  }

  return (
    <div className="flex items-center gap-4 bg-[#fcfaf8] px-4 min-h-[120px] py-4 justify-between mb-4">
      <div className="flex items-center gap-4">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-24"
          // style={{ backgroundImage: `url("${image}")` }}
        ></div>
        <div className="flex flex-col justify-center">
          <p className="text-[#1b130d] text-lg font-medium leading-normal line-clamp-1">{name}</p>
          <p className="text-[#9a6c4c] text-sm font-normal leading-normal line-clamp-2">{description}</p>
          <p className="text-[#1b130d] text-base font-bold mt-2">${price.toFixed(2)}</p>
        </div>
      </div>
      <div className="shrink-0">
        <button
          onClick={handleAddClick}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f3ece7] text-[#1b130d] text-sm font-medium leading-normal w-fit"
        >
          <span className="truncate">Add</span>
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">{name}</h2>
        <p className="mb-2">{description}</p>
        <p className="mb-4">Base Price: ${price.toFixed(2)}</p>
        <div className="mb-4">
          <label htmlFor="profitPercentage" className="block mb-2">
            Profit Percentage:
          </label>
          <input
            type="number"
            id="profitPercentage"
            value={profitPercentage}
            onChange={handleProfitChange}
            className="w-full p-2 border rounded"
            placeholder="Enter profit percentage"
          />
        </div>
        <p className="text-lg font-bold mb-4">Final Price: ${finalPrice.toFixed(2)}</p>
        <button onClick={() => setIsModalOpen(false)} className="bg-[#f3ece7] text-[#1b130d] px-4 py-2 rounded-xl">
          Close
        </button>
      </Modal>
    </div>
  )
}

