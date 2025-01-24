import { ArrowLeft } from "lucide-react";
import { productType, productVariant_Interface } from "../../types";
import { Button } from "../ui/button";
import { useEffect } from "react";

// interface CartItem {
//   id: string
//   name: string
//   code: string
//   weight: string
//   image: string
//   price: number
//   quantity: number
// }

interface CartProps {
  cartItems: productVariant_Interface[];
  updateCartItemQuantity: (id: number, newQuantity: number) => void;
  removeFromCart: (id: number) => void;
  
  DataProduct: productType[];
 
}

export default function Cart({
  cartItems,
  DataProduct,
  updateCartItemQuantity,
  removeFromCart,

}: CartProps) {
  // const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  // const handleSubmit = (data: productVariant_Interface[]) => {
  //    console.log("Datos",data)
  // }
useEffect(()=>{
  console.log(cartItems)
  
},[cartItems])



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

}
  

  //   // const data = {
  //   //   idProducto: 0,
  //   //   nombreProducto: productData.nombreProducto,
  //   //   imagenProducto: productData.imagenProducto || null,
  //   //   categoria: productData.categoria ,
  //   //   origen: productData.origen,
  //   //   nivelTostion: productData.nivelTostion,
  //   //   estadoProducto: true,
  //   //   cantidad: 0
  //   // }
  //   const response = create(data)
  //   console.log(response)

  //   onClose();
  // };

  //     // const data = {
  //     //   idProducto: 0,
  //     //   nombreProducto: productData.nombreProducto,
  //     //   imagenProducto: productData.imagenProducto || null,
  //     //   categoria: productData.categoria ,
  //     //   origen: productData.origen,
  //     //   nivelTostion: productData.nivelTostion,
  //     //   estadoProducto: true
  //     // }
  //     // const response = create(data)
  //     console.log(data)

  // }

  return (
    <div className="layout-content-container flex flex-col w-[500px]">
      <div className="flex flex-wrap justify-between gap-3 mb-4">
        <p className="text-[#181411] tracking-light text-[32px] font-bold leading-tight min-w-72">
          Your Cart
        </p>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-[#887563] text-lg">Tu carrito esta vacío</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.idVariante}
              className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between rounded-xl border border-[#f4f2f0]"
            >
              <div className="flex items-center gap-4">
                {/* <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                  style={{ backgroundImage: `url(${item.imagenVariante})` }}
                ></div> */}
                <div className="flex flex-col justify-center">
                  <p className="text-[#181411] text-base font-medium leading-normal line-clamp-3">
                    {DataProduct.filter(
                      (product) => product.idProducto === item.idProducto
                    )
                      .map((product) => product.nombreProducto)
                      .join(", ")}
                  </p>
                  <p className="text-[#887563] text-sm font-normal leading-normal line-clamp-2">
                    {item.gramaje} g
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-[#181411]">
                  <button
                    className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f2f0] cursor-pointer"
                    onClick={() =>
                      updateCartItemQuantity(
                        item.idVariante,
                        item.idVariante - 1
                      )
                    }
                  >
                    -
                  </button>
                  <input
                    className="text-base font-medium leading-normal w-8 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    value={item.cantidad}
                    onChange={(e) =>
                      updateCartItemQuantity(
                        item.idVariante,
                        Number.parseInt(e.target.value) || 1
                      )
                    }
                    min="1"
                  />
                  <button
                    className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f2f0] cursor-pointer"
                    onClick={() =>
                      updateCartItemQuantity(item.idVariante, item.cantidad + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.idVariante)}
                  className="text-[#e68019] px-4 py-2 rounded-xl text-sm font-bold"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center py-3 border-t border-[#f4f2f0]">
            {/* <p className="text-[#181411] text-lg font-bold">Total:</p>
            <p className="text-[#181411] text-lg font-bold">${total.toFixed(2)}</p> */}
          </div>
          <div className="flex">
            <Button
              variant="outline"
              onClick={(e)=>handleSubmit(e)}
              className="lex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#e68019] text-white text-sm font-bold leading-normal tracking-[0.015em]"
            >
              Registrar
              
            </Button>
           
          </div>
        </div>
      )}
      <div className="flex mt-4">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#f0e7dd] text-[#181411] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]">
          <ArrowLeft size={20} />
          <span className="truncate">Cancelar</span>
        </button>
      </div>
    </div>
  );
}
