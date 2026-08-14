// components/ui/ProductInfo.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Product, getCategoryName } from "@/app/types/product";
import { QuantitySelector } from "../../ui/QuantitySelector";
import { useCart } from "@/features/cart/hooks/useCart";
import { useAuth } from "@/providers/AuthContext";
import { useWishlist } from "@/providers/WishlistContext";
import { formatPrice } from "@/app/utils/formatPrice";

export function ProductInfo({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useWishlist();
  const [variant, setVariant] = useState(product.variants?.options[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const favorite = isFavorite(product.id);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      router.push("/auth");
      return;
    }

    await toggleFavorite(product);
  };

  const handleAdd = () => {
    addToCart(product, qty, variant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    // Aqui viria a lógica real do carrinho (ex: hook useCart)
  };

  return (
    <div className="flex flex-col">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        {getCategoryName(product.category)}
      </p>
      <div className="mt-3 flex items-start justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
        <button
          type="button"
          onClick={() => void handleToggleFavorite()}
          aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground cursor-pointer"
        >
          <Heart className={`h-5 w-5 ${favorite ? "fill-foreground text-foreground" : ""}`} />
        </button>
      </div>
      <p className="mt-4 text-2xl font-medium">{formatPrice(product.price)}</p>
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

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAdd}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer sm:flex-1"
        >
          {added ? "Adicionado" : `Comprar — ${formatPrice(product.price * qty)}`}
        </button>

        <button
          type="button"
          onClick={() => void handleToggleFavorite()}
          className={`inline-flex h-12 items-center justify-center gap-2 rounded-md border px-6 text-sm font-medium transition-colors cursor-pointer sm:min-w-52 ${favorite ? "border-foreground bg-secondary text-foreground" : "border-border text-foreground hover:bg-secondary"}`}
        >
          <Heart className={`h-4 w-4 ${favorite ? "fill-foreground" : ""}`} />
          {favorite ? "Nos favoritos" : "Adicionar aos favoritos"}
        </button>
      </div>

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