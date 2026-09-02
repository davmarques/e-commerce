"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Product, getCategoryName } from "@/app/types/product";
import { formatPrice } from "@/app/utils/formatPrice";
import { useAuth } from "@/providers/AuthContext";
import { useWishlist } from "@/providers/WishlistContext";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { isFavorite, toggleFavorite } = useWishlist();
    const favorite = isFavorite(product.id);

    return (
        <Link href={`/product/${product.slug}`} className="group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-brand-surface border border-white/10 shadow-lg">
                <button
                    type="button"
                    aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        if (!isAuthenticated) {
                            router.push("/auth");
                            return;
                        }

                        void toggleFavorite(product);
                    }}
                    className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-brand-dark/80 text-white/70 shadow-sm backdrop-blur transition-colors hover:text-white cursor-pointer"
                >
                    <Heart className={`h-5 w-5 ${favorite ? "fill-secondary text-secondary" : ""}`} />
                </button>
                <Image
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                    fill
                    loading="eager"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="mt-4 flex flex-col items-center">
                <div className="flex-1 text-start w-full">
                    <h3 className="text-lg font-semibold font-outfit text-white group-hover:text-brand-primary transition-colors">{product.name}</h3>
                </div>
                <div className="flex flex-row items-end justify-between w-full">
                    <span className="text-sm text-white/50 font-figtree">
                        {getCategoryName(product.category)}
                    </span>
                    <p className="text-lg font-outfit font-semibold text-white mt-1">{formatPrice(product.price)}</p>
                </div>
            </div>
        </Link>
    );
}