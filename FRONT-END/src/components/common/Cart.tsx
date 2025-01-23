import { ArrowLeft } from "lucide-react"

interface CartItem {
  id: string
  name: string
  code: string
  weight: string
  image: string
  price: number
  quantity: number
}

interface CartProps {
  cartItems: CartItem[]
  updateCartItemQuantity: (id: string, newQuantity: number) => void
  removeFromCart: (id: string) => void
}

export default function Cart({ cartItems, updateCartItemQuantity, removeFromCart }: CartProps) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="layout-content-container flex flex-col w-[500px]">
      <div className="flex flex-wrap justify-between gap-3 mb-4">
        <p className="text-[#181411] tracking-light text-[32px] font-bold leading-tight min-w-72">Your Cart</p>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-[#887563] text-lg">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between rounded-xl border border-[#f4f2f0]"
            >
              <div className="flex items-center gap-4">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="flex flex-col justify-center">
                  <p className="text-[#181411] text-base font-medium leading-normal line-clamp-1">{item.name}</p>
                  <p className="text-[#887563] text-sm font-normal leading-normal line-clamp-2">
                    {item.code} | {item.weight}
                  </p>
                  <p className="text-[#181411] text-sm font-bold leading-normal">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-[#181411]">
                  <button
                    className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f2f0] cursor-pointer"
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    className="text-base font-medium leading-normal w-8 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 focus:border-none border-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateCartItemQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button
                    className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f4f2f0] cursor-pointer"
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-[#e68019] px-4 py-2 rounded-xl text-sm font-bold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center py-3 border-t border-[#f4f2f0]">
            <p className="text-[#181411] text-lg font-bold">Total:</p>
            <p className="text-[#181411] text-lg font-bold">${total.toFixed(2)}</p>
          </div>
          <div className="flex">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#e68019] text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Checkout</span>
            </button>
          </div>
        </div>
      )}
      <div className="flex mt-4">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#f4f2f0] text-[#181411] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]">
          <ArrowLeft size={20} />
          <span className="truncate">Continue Shopping</span>
        </button>
      </div>
    </div>
  )
}

