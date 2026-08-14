"use client";
import { useCart } from "@/features/cart/hooks/useCart";
import { X, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/app/utils/formatPrice";
import Link from "next/link";

export default function SidebarCart({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, cartTotal, removeFromCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay escuro */}
      <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      {/* Painel Lateral */}
      <div className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white p-6 shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b pb-6">
          <h2 className="text-xl font-semibold font-display">Seu Carrinho</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full cursor-pointer">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-6 h-[calc(100vh-210px)]">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-black/40">
              Seu carrinho está vazio.
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id + item.selectedVariant} className="flex gap-4">
                <div className="h-20 w-20 bg-secondary rounded-md" /> 
                <div className="flex flex-1 flex-col text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-black/40">{item.selectedVariant}</span>
                  <div className="mt-auto flex justify-between">
                    <span>{item.quantity} x {formatPrice(item.price)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs cursor-pointer">Remover</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t pt-2 space-y-4">
            <div className="flex justify-between items-center font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <Link 
              href="/cart" 
              onClick={onClose}
              className="w-full flex h-12 items-center justify-center rounded-full bg-black text-white hover:bg-black/90 transition-all font-medium"
            >
              Ver Carrinho Completo
            </Link>
          </div>
        )}
      </div>
    </>
  );
}