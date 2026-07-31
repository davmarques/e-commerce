"use client";

import { useContext } from "react";
import { CartContext } from "@/contexts/CardContext"; // Ajuste se o caminho mudar

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }

  return context;
}