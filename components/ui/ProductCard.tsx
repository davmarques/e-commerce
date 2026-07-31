import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types/product";
import { formatPrice } from "@/app/utils/formatPrice";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.slug}`} className="group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#F3F3F3]">
                <div className="absolute inset-0 flex items-center justify-center text-black/10">
                    [IMAGEM]
                </div>
                {/* Quando tiver imagens reais:
                <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                /> 
                */}
            </div>
            <div className="mt-4 flex flex-row items-center">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold font-outfit text-black">{product.name}</h3>
                    <span className="text-sm text-black/40 font-figtree">{product.category}</span>
                </div>
                <div>
                    <p className="text-lg font-outfit mt-1">{formatPrice(product.price)}</p>
                </div>
            </div>
        </Link>
    );
}