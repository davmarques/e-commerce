"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/features/products/ProductCard";
import { CategoryFilters } from "@/components/features/catalog/CategoryFilters";
import { SortSelect, SortId } from "@/components/features/catalog/SortSelect";
import { Product, getCategoryName, normalizeProducts } from "@/app/types/product";
import { fetchProducts, fetchCategories } from "@/app/services/api";
import { Spinner } from "@/components/ui/spinner";

function CollectionsContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "All";

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>(["All"]);
    const [category, setCategory] = useState<string>(initialCategory);
    const [sort, setSort] = useState<SortId>("featured");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            try {
                const [productsData, categoriesData] = await Promise.all([fetchProducts(), fetchCategories()]);
                if (!isMounted) return;

                const normalizedProducts = normalizeProducts(productsData);
                const normalizedCategoryNames = categoriesData.flatMap((item) => {
                    if (typeof item === "string") return [item];

                    if (
                        item &&
                        typeof item === "object" &&
                        "name" in item &&
                        typeof item.name === "string"
                    ) {
                        return [item.name];
                    }

                    return [];
                });

                const categoryNames = ["All", ...normalizedCategoryNames];

                setProducts(normalizedProducts);
                setCategories(categoryNames);
                setError(null);
            } catch (err) {
                if (!isMounted) return;
                console.error(err);
                setError("Não foi possível carregar os produtos no momento.");
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        void loadData();
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const cat = searchParams.get("category");
        if (cat) {
            setCategory(cat);
        }
    }, [searchParams]);

    const visibleProducts = useMemo(() => {
        let filtered = category === "All"
            ? products
            : products.filter((p) => getCategoryName(p.category) === category);

        const sorted = [...filtered];
        if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
        else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
        else if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));

        return sorted;
    }, [category, products, sort]);

    return (
        <main>
            <header className="border-b border-white/10 px-4 md:px-20">
                <div className="container-tight py-16 lg:py-24 px-4">
                    <p className="text-sm font-medium uppercase tracking-widest text-brand-primary">
                        A Coleção
                    </p>
                    <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Cada objeto, pensado.
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
                        Uma curadoria de itens essenciais, feitos para durar.
                    </p>
                </div>
            </header>

            <section className="container-tight">
                <div className="flex flex-col gap-6 border-b border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between px-4 md:px-20">
                    <CategoryFilters
                        categories={categories}
                        activeCategory={category}
                        onSelect={setCategory}
                    />
                    <SortSelect value={sort} onChange={setSort} />
                </div>

                <p className="mt-6 text-sm text-muted-foreground px-4 md:px-20">
                    {loading ? <Spinner className="flex mx-auto mb-4" /> : `${visibleProducts.length} ${visibleProducts.length === 1 ? "produto" : "produtos"}`}
                </p>

                {error ? (
                    <div className="my-16 text-center text-muted-foreground">{error}</div>
                ) : loading ? null : visibleProducts.length === 0 ? (
                    <div className="my-16 text-center text-muted-foreground">
                        Nenhum produto encontrado nesta categoria.
                    </div>
                ) : (
                    <div className="my-8 px-8 md:px-20 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
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