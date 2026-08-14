import Hero from "@/components/features/home/Hero";
import FeaturedProducts from "@/components/features/home/FeaturedProducts";
import Categories from "@/components/features/home/Categories";
import Newsletter from "@/components/features/home/Newsletter";
import Footer from "@/components/layout/Footer";
import { fetchProducts, fetchCategories } from "@/app/services/api";
import { normalizeProducts } from "@/app/types/product";

export default async function Home() {
  const [productsData, categoriesData] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  const products = normalizeProducts(productsData);
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts products={featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4)} />
      <Categories categories={categoriesData} />
      <Newsletter />
      <Footer />
    </div>
  );
}
