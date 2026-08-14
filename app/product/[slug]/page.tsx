import { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/features/products/ProductCard";
import { ProductGallery } from "@/components/features/products/ProductGallery";
import { ProductInfo } from "@/components/features/products/ProductInfo";
import { getCategoryName, normalizeProduct, normalizeProducts } from "@/app/types/product";
import { fetchProductBySlug, fetchProducts } from "@/app/services/api";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const productData = await fetchProductBySlug(slug);

  if (!productData) {
    notFound();
  }

  const product = normalizeProduct(productData);

  return {
    title: `${product.name} — Forma`,
    description: product.description?.slice(0, 160) || '',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const productData = await fetchProductBySlug(slug);

  if (!productData) notFound();

  const product = normalizeProduct(productData);
  const allProducts = normalizeProducts(await fetchProducts());
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container-tight py-10 lg:py-16 px-4 md:px-20">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Início
          </Link>

          <span role="presentation" className="text-black/20 text-lg">/</span>

          <Link href="/collections" className="transition-colors hover:text-foreground">
            {getCategoryName(product.category)}
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

        <section className="mt-24">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Você também pode gostar</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}