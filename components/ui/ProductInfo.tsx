// components/ui/ProductInfo.tsx
"use client";
import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/app/types/product";
import { QuantitySelector } from "./QuantitySelector";
import { useCart } from "@/hooks/useCart";

export function ProductInfo({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [variant, setVariant] = useState(product.variants?.options[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, qty, variant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    // Aqui viria a lógica real do carrinho (ex: hook useCart)
  };

  return (
    <div className="flex flex-col">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">{product.category}</p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
      <p className="mt-4 text-2xl font-medium">R$ {product.price.toFixed(2)}</p>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

      {/* Variantes */}
      {product.variants && (
        <div className="mt-8">
          <p className="text-sm font-medium">{product.variants.label}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.variants.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setVariant(opt)}
                className={`h-10 rounded-md border px-4 text-sm transition-colors ${variant === opt ? "border-foreground bg-foreground text-background" : "border-border hover:bg-secondary cursor-pointer"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      <QuantitySelector qty={qty} onChange={setQty} />

      <button
        onClick={handleAdd}
        className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
      >
        {added ? "Adicionado" : `Comprar — R$ ${(product.price * qty).toFixed(2)}`}
      </button>

      {/* Detalhes Técnicos */}
      {product.details && product.details.length > 0 && (
        <div className="mt-10 border-t border-border pt-8">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest">Detalhes</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {product.details.map((d) => (
              <li key={d} className="flex gap-2"><span className="text-foreground">—</span>{d}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}