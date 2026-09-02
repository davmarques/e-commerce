"use client";
import { useCart } from "@/features/cart/hooks/useCart";
import { X, ShoppingBag, Trash2 } from "lucide-react";
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
      <div className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-background text-white border-l border-white/10 p-6 shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <h2 className="text-xl font-semibold font-display">Seu Carrinho</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full cursor-pointer text-white/70 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-6 h-[calc(100vh-210px)]">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              Seu carrinho está vazio.
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id + item.selectedVariant} className="flex gap-4">
                <div className="h-20 w-20 bg-brand-dark border border-white/10 rounded-md overflow-hidden" />
                <div className="flex flex-1 flex-col text-sm">
                  <span className="font-medium text-white">{item.name}</span>
                  <span className="text-white/50 text-xs">{item.selectedVariant}</span>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-white/80 font-medium">{item.quantity} x {formatPrice(item.price)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300 text-xs cursor-pointer"><Trash2 /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-4">
            <div className="flex justify-between items-center font-semibold text-white">
              <span>Subtotal</span>
              <span className="text-brand-primary">{formatPrice(cartTotal)}</span>
            </div>
            <Link
              href="/cart"
              onClick={onClose}
              className="w-full flex h-12 items-center justify-center rounded-full bg-primary text-white hover:scale-[1.02] shadow-primary/20 transition-all font-medium"
            >
              Ver Carrinho Completo
            </Link>
          </div>
        )}
      </div>
    </>
  );
}