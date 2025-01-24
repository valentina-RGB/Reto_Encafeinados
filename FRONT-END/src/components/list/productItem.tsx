"use client";

import { useState } from "react";
import { productType } from "../../types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useProductVariantService } from "../../api/services/productVariantServices";

export default function ProductItem({
  nombreProducto,
  imagenProducto,
  estadoProducto,
  idProducto
}: productType) {

  const { create } = useProductVariantService();

  // PARA LAS VARIANTES DE PRODUCTO
  const [formData, setFormData] = useState({
    gramaje: 0,
    imagenVariante: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setFormData((prev) => ({ ...prev, imagenVariante: file }));
      // setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const resetForm = () => {
    setFormData({
      gramaje: 0,
      imagenVariante: null,
    });
    // setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    alert("Formulario enviado: " + JSON.stringify(formData));

    if (formData.gramaje) {
      const data = {
        idVariante: 0,
        idProducto: idProducto,
        gramaje: formData.gramaje,
        estadoVariante: true,
        imagenVariante: formData.imagenVariante || null,
        cantidad: 0
      };

      const response = create(data);

      if (!response) {
        console.log("Error al crear la variante", response);
      }
    }
    resetForm();
    // Aquí puedes manejar la lógica para guardar o enviar los datos
  };

  // VALIDACIONES DE FORMULARIO

  return (
    <div className="flex items-center gap-4 bg-[#fcfaf8] px-4 min-h-[120px] py-4 justify-between mb-4">
      <div className="flex items-center gap-4">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-24"
          style={{ backgroundImage: `url("${imagenProducto}")` }}
        ></div>
        <div className="flex flex-col justify-center">
          <p className="text-[#1b130d] text-lg font-medium leading-normal line-clamp-1">
            {nombreProducto}
          </p>
          <p className="text-[#9a6c4c] text-sm font-normal leading-normal line-clamp-2">
            {estadoProducto}
          </p>
          {/* <p className="text-[#1b130d] text-base font-bold mt-2">${price.toFixed(2)}</p> */}
        </div>
      </div>
      <div className="shrink-0">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className=" bg-cafe-700 text-white file:font-semibold
                hover:bg-cafe-600"
            >
              Agregar variante
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <form onSubmit={handleSubmit} className="grid gap-4 space-x-3">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">{nombreProducto}</h4>
                <p className="text-sm text-muted-foreground">
                  Completa los campos para agregar una nueva variante.
                </p>
              </div>
              <div className="grid gap-4">
                {/* Campo Width */}
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label htmlFor="variante" className="text-right">
                    Gramaje
                  </Label>
                  <Input
                    id="variante"
                    type="number"
                    name="gramaje"
                    value={formData.gramaje}
                    onChange={handleChange}
                    className="col-span-2 h-10"
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Imagen</Label>
                  <Input
                    id="picture"
                    accept="image/*"
                    className="col-span-2 h-11"
                    name="imagenVariante"
                    type="file"
                    onChange={(e) =>
                      handleImageChange(e.target.files?.[0] || null)
                    }
                  />
                </div>
              </div>
              {/* Botón para enviar */}
              <Button
                type="submit"
                variant="default"
                className="mt-4 mx-auto bg-cafe-500 text-white file:font-semibold
                hover:bg-cafe-600"
              >
                Guardar variante
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
