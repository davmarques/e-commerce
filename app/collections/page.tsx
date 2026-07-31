"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { CategoryFilters } from "@/components/ui/CategoryFilters";
import { SortSelect, SortId } from "@/components/ui/SortSelect";
import { Product } from "@/app/types/product";
// import { products } from "@/lib/products";

export const products: Product[] = [
    { 
        id: "1", 
        name: "Camiseta Classic White", 
        price: 89.90, 
        category: "Roupas", 
        slug: "camiseta-classic-white", 
        image: "/products/tshirt.jpg" 
    },
    { 
        id: "2", 
        name: "Calça Jeans Slim", 
        price: 199.00, 
        category: "Roupas", 
        slug: "calca-jeans-slim", 
        image: "/products/jeans.jpg" 
    },
    { 
        id: "3", 
        name: "Jaqueta Bomber Black", 
        price: 299.00, 
        category: "Casacos", 
        slug: "jaqueta-bomber-black", 
        image: "/products/jacket.jpg" 
    },
    { 
        id: "4", 
        name: "Tênis Urban Gray", 
        price: 349.00, 
        category: "Calçados", 
        slug: "tenis-urban-gray", 
        image: "/products/shoes.jpg" 
    }
];

function CollectionsContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "All";
    
    const [category, setCategory] = useState<string>(initialCategory);
    const [sort, setSort] = useState<SortId>("featured");

    useEffect(() => {
        const cat = searchParams.get("category");
        if (cat) {
            setCategory(cat);
        }
    }, [searchParams]);

    const categories = useMemo(
        () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
        []
    );

    const visibleProducts = useMemo(() => {
        let filtered = category === "All"
            ? products
            : products.filter((p) => p.category === category);

        const sorted = [...filtered];
        if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
        else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
        else if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));

        return sorted;
    }, [category, sort]);

    return (
        <main>
            {/* Hero Section */}
            <header className="border-b border-black/10 px-4 md:px-20">
                <div className="container-tight py-16 lg:py-24 px-4">
                    <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                        A Coleção
                    </p>
                    <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                        Cada objeto, pensado.
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                        Uma curadoria de itens essenciais para a casa, feitos para durar.
                    </p>
                </div>
            </header>

            <section className="container-tight">
                {/* Toolbar */}
                <div className="flex flex-col gap-6 border-b border-black/10 py-6 sm:flex-row sm:items-center sm:justify-between px-4 md:px-20">
                    <CategoryFilters
                        categories={categories}
                        activeCategory={category}
                        onSelect={setCategory}
                    />
                    <SortSelect value={sort} onChange={setSort} />
                </div>

                <p className="mt-6 text-sm text-muted-foreground px-4 md:px-20">
                    {visibleProducts.length} {visibleProducts.length === 1 ? "produto" : "produtos"}
                </p>

                {/* Grid */}
                {visibleProducts.length === 0 ? (
                    <div className="my-16 text-center text-muted-foreground">
                        Nenhum produto encontrado nesta categoria.
                    </div>
                ) : (
                    <div className="my-8 px-4 md:px-20 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default function CollectionsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Suspense fallback={<div className="p-20 text-center text-muted-foreground">Carregando coleção...</div>}>
                <CollectionsContent />
            </Suspense>
            <Footer />
        </div>
    );
}