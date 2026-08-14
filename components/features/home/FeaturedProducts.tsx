import ProductCard from "@/components/features/products/ProductCard";
import { Product } from "@/app/types/product";
import { Button } from "../../ui/Button";
import Link from "next/link";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="px-4 md:px-20 py-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-outfit text-black">
            Destaques da Semana
          </h2>
          <p className="text-black/60 font-figtree mt-2">
            As peças que estão definindo a tendência desta temporada.
          </p>
        </div>
        
        {/* Usando Button na versão Desktop */}
        <Link href="/collections" className="hidden md:block">
            <Button variant="ghost" className="border-x-0 border-t-0 border-b-2 border-black rounded-none px-0 py-1 hover:bg-transparent">
                Ver todos os produtos
            </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Usando Button na versão Mobile */}
      <div className="mt-10 md:hidden flex justify-center">
        <Link href="/collections">
          <Button variant="ghost" size="lg" className="border-x-0 border-t-0 border-b-2 border-black rounded-none px-0 py-1 hover:bg-transparent">
            Ver todos os produtos
          </Button>
        </Link>
      </div>
    </section>
  );
}