"use client";

import { Minus, Plus, X } from "lucide-react";
import { formatPrice } from "@/app/utils/formatPrice";
import { useCart } from "@/features/cart/hooks/useCart";

export function CartItem({ item }: { item: any }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-start gap-4 border-b border-black/5 py-6">
      <div className="h-24 w-20 bg-secondary rounded-lg" /> {/* Placeholder para imagem */}
      
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="font-semibold">{item.name}</h3>
          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-black/40 hover:text-black cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-black/40 mb-4">{item.selectedVariant}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center border border-black/10 rounded-full px-2">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 cursor-pointer"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-3 text-sm">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 cursor-pointer"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
}