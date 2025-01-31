"use client";

import { useState } from "react";
import ProductList from "../components/list/productList";
import Pagination from "../components/common/Pagination";
import AddProductModal from "../components/common/AddProductModal";
import { productType } from "../types";


// import Pagination from "../components/Pagination"
// import AddProductModal from "../components/AddProductModal"

export default function Products() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  
 

  

  const handleAddProduct = (product: productType) => {
    // Aquí puedes implementar la lógica para agregar el producto a tu lista de productos
    console.log("New product:", product);
  };

  return (
    <div
    // className="relative flex size-full min-h-screen flex-col bg-[#fcfaf8] group/design-root overflow-x-hidden"
    // style={{ fontFamily: 'Epilogue, "Noto Sans", sans-serif' }}
    >
      <div>
        {/* <Header /> */}
        <div className="px-4  flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[980px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#1b130d] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Coffee Products
              </p>
              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f3ece7] text-[#1b130d] text-sm font-medium leading-normal"
              >
                <span className="truncate">Add Product</span>
              </button>
            </div>
            
            <ProductList />
            <Pagination />
          </div>
        </div>
      </div>
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}
