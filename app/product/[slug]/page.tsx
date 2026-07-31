import { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import { ProductGallery } from "@/components/ui/ProductGallery";
import { ProductInfo } from "@/components/ui/ProductInfo"; // Ver abaixo
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ slug: string }>; // Altere para Promise
}

// SEO Dinâmico
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params; // Aguarde o parâmetro
  const product = products.find((p) => p.slug === slug);

  if (!product) { notFound() };

  return {
    title: `${product.name} — Forma`,
    description: product.description?.slice(0, 160) || '',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params; // Aguarde o parâmetro
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container-tight py-10 lg:py-16 px-4 md: px-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <Link
            href="/"
            className="transition-colors hover:text-foreground"
          >
            Início
          </Link>

          <span role="presentation" className="text-black/20 text-lg">/</span>

          <Link
            href="/collections"
            className="transition-colors hover:text-foreground"
          >
            {product.category}
          </Link>

          <span role="presentation" className="text-black/20 text-lg">/</span>

          <span className="text-foreground font-medium truncate" aria-current="page">
            {product.name}
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images || []} name={product.name} />
          <ProductInfo product={product} />
        </div>

        {/* Sugestões (Poderia ser outro componente) */}
        <section className="mt-24">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Você também pode gostar</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                // Aqui você usaria o seu ProductCard.tsx já existente
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}