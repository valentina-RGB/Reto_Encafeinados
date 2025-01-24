"use client";
import * as React from "react";
import { useState } from "react";
import Modal from "./Modal";
// import { useProductService } from "../../api/services/productServices";


// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddProduct: (product: any) => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onAddProduct,
}: AddProductModalProps) {
  const [productData, setProductData] = useState({
    nombreProducto: "",
    imagenProducto: null as File | null,
    categoria: "",
    origen: "",
    nivelTostion: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "nivelTostion") {
      setProductData((prev) => ({
        ...prev,
        [name]: value, // Actualiza el valor según el checkbox seleccionado
      }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setProductData((prev) => ({ ...prev, imagenProducto: file }));
      // setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAddProduct(productData);
    console.log(productData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 space-x-3">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">ff</h4>
          <p className="text-sm text-muted-foreground">
            Completa los campos para agregar una nueva variante.
          </p>
        </div>
        <div className="grid gap-4">
          {/* Campo Width */}
          <div className="grid grid-cols-3 items-center gap-2">
            <Label htmlFor="variante" className="text-right">
              Nombre del producto
            </Label>
            <Input
              id="variante"
              type="text"
              name="nombreProducto"
              value={productData.nombreProducto}
              onChange={handleInputChange}
              className="col-span-2 h-10"
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Categoría</Label>
            <select
              className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              id="categoria"
              name="categoria"
              value={productData.categoria}
              onChange={handleInputChange}
            >
              <option value="grano">Café en grano</option>
              <option value="molido">Café molido</option>
              <option value="capsula">Capsula</option>
            </select>
          </div>
          {/* Campo Height */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Imagen</Label>
            <Input
              id="picture"
              accept="image/*"
              className="col-span-2 h-11"
              name="imagenVariante"
              type="file"
              onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message-2">Origen</Label>
            <Textarea
              name="origen"
              onChange={handleInputChange}
              value={productData.origen}
              placeholder="Type your message here."
              id="message-2"
            />
            <p className="text-sm text-muted-foreground">
              Your message will be copied to the support team.
            </p>
          </div>
        </div>
        <div>
          <label className="block mb-2">Nivel de Tostión:</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="nivelTostion"
                value="bajo"
                checked={productData.nivelTostion === "bajo"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Bajo
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="nivelTostion"
                value="medio"
                checked={productData.nivelTostion === "medio"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Medio
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="nivelTostion"
                value="alto"
                checked={productData.nivelTostion === "alto"}
                onChange={handleInputChange}
                className="mr-2"
              />
              Alto
            </label>
          </div>
        </div>
        {/* Botón para enviar */}
        <Button
          type="submit"
          variant="default"
          className="mt-4 mx-auto bg-cafe-500 text-white file:font-semibold
                hover:bg-cafe-600"
        >
          Guardar producto
        </Button>
      </form>
    </Modal>
  );
}
