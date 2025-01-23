"use client"

import { useState } from "react"
import Modal from "./Modal"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onAddProduct: (product: any) => void
}

export default function AddProductModal({ isOpen, onClose, onAddProduct }: AddProductModalProps) {
  const [productData, setProductData] = useState({
    nombreProducto: "",
    imagenProducto: "",
    categoria: "",
    origen: "",
    nivelTostion: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement
      setProductData((prev) => ({ ...prev, [name]: checkbox.checked ? "Tostado" : "Sin tostar" }))
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddProduct(productData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombreProducto" className="block mb-2">
            Product Name:
          </label>
          <input
            type="text"
            id="nombreProducto"
            name="nombreProducto"
            value={productData.nombreProducto}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imagenProducto" className="block mb-2">
            Product Image URL:
          </label>
          <input
            type="text"
            id="imagenProducto"
            name="imagenProducto"
            value={productData.imagenProducto}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoria" className="block mb-2">
            Category:
          </label>
          <select
            id="categoria"
            name="categoria"
            value={productData.categoria}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            <option value="Whole Bean">Whole Bean</option>
            <option value="Ground">Ground</option>
            <option value="Instant">Instant</option>
            <option value="Cold Brew">Cold Brew</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="origen" className="block mb-2">
            Origin:
          </label>
          <input
            type="text"
            id="origen"
            name="origen"
            value={productData.origen}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nivelTostion" className="flex items-center">
            <input
              type="checkbox"
              id="nivelTostion"
              name="nivelTostion"
              checked={productData.nivelTostion === "Tostado"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Roasted
          </label>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl">
            Cancel
          </button>
          <button type="submit" className="bg-[#f3ece7] text-[#1b130d] px-4 py-2 rounded-xl">
            Add Product
          </button>
        </div>
      </form>
    </Modal>
  )
}

