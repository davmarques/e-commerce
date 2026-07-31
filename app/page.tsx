import Hero from "@/components/ui/Hero";
import FeaturedProducts from "@/components/layout/FeaturedProducts";
import Categories from "@/components/layout/Categories";
import Newsletter from "@/components/layout/Newsletter";
import Footer from "@/components/layout/Footer";
import { Product } from "@/app/types/product";

const featuredProducts: Product[] = [
    { id: "1", name: "Camiseta Classic White", price: 89.90, category: "Roupas", slug: "camiseta-classic-white", image: "/products/tshirt.jpg" },
    { id: "2", name: "Calça Jeans Slim", price: 199.00, category: "Roupas", slug: "calca-jeans-slim", image: "/products/jeans.jpg" },
    { id: "3", name: "Jaqueta Bomber Black", price: 299.00, category: "Casacos", slug: "jaqueta-bomber-black", image: "/products/jacket.jpg" },
    { id: "4", name: "Tênis Urban Gray", price: 349.00, category: "Calçados", slug: "tenis-urban-gray", image: "/products/shoes.jpg" }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  );
}