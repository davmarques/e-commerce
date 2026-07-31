"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/app/types/product";

interface CartItem extends Product {
  quantity: number;
  selectedVariant?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, variant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("forma-cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("forma-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number, variant?: string) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.selectedVariant === variant
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.selectedVariant === variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedVariant: variant }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};