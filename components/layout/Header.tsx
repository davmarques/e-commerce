"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";
import { useCart } from "@/features/cart/hooks/useCart";
import { useAuth } from "@/providers/AuthContext";
import SidebarCart from "../features/cart/SidebarCart";
import { ShoppingBag, Search, X, User, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBranding } from "@/providers/BrandingProvider";
import { fetchProducts } from "@/app/services/api";
import { Product, getCategoryName, normalizeProducts } from "@/app/types/product";
import { formatPrice } from "@/app/utils/formatPrice";

const navigation = [
    { name: "Shop", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useCart();
    const { isAuthenticated, user, logout } = useAuth();
    const branding = useBranding();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const userMenuItems = [
        { name: "Minha Conta", href: "/account" },
        { name: "Meus Pedidos", href: "/orders" },
        { name: "Lista de Desejos", href: "/wishlist" },
    ];

    function handleSearchToggle() {
        if (isSearchOpen) {
            setIsSearchOpen(false);
            setSearchQuery("");
            searchInputRef.current?.blur();
            return;
        }

        setIsOpen(false);
        setIsSearchOpen(true);
    }

    useEffect(() => {
        if (isSearchOpen) {
            searchInputRef.current?.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        if (!isSearchOpen || products.length > 0) return;

        let isMounted = true;

        async function loadProducts() {
            setIsSearchLoading(true);
            setSearchError(null);

            try {
                const productsData = await fetchProducts();
                if (isMounted) setProducts(normalizeProducts(productsData));
            } catch (err) {
                console.error(err);
                if (isMounted) setSearchError("Não foi possível carregar os produtos.");
            } finally {
                if (isMounted) setIsSearchLoading(false);
            }
        }

        void loadProducts();

        return () => {
            isMounted = false;
        };
    }, [isSearchOpen, products.length]);

    const searchResults = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return [];

        return products
            .filter((product) => {
                const searchableText = [product.name, getCategoryName(product.category), product.description]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                return searchableText.includes(query);
            })
            .slice(0, 5);
    }, [products, searchQuery]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!userMenuRef.current?.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="relative z-50">
            {branding?.topbar_active && branding.topbar_announcement && (
                <div className="overflow-hidden bg-primary py-2 text-xs font-medium text-primary-foreground select-none">
                    <motion.div
                        className="flex w-max items-center"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{
                            ease: "linear",
                            duration: 35,
                            repeat: Infinity,
                        }}
                    >
                        {Array.from({ length: 24 }).map((_, i) => (
                            <span key={i} className="flex items-center gap-8 px-4 tracking-wide whitespace-nowrap">
                                <span>{branding.topbar_announcement}</span>
                                <span className="opacity-60">•</span>
                            </span>
                        ))}
                    </motion.div>
                </div>
            )}
            <div className="flex relative items-center justify-between py-0 px-4 md:px-20 border-b border-white/10 rounded-2xl" style={{ backgroundColor: "var(--background)" }}>
                <div className="flex items-center md:space-x-4">
                    <div className="md:hidden text-xl font-semibold text-white">
                        <Link href="/">
                            {branding?.logo_url ? (
                                <Image src={branding.logo_url} alt={branding.store_name || "STORMS development"} width={240} height={120} className="h-14 w-auto object-contain py-3" unoptimized />
                            ) : (
                                <Image src="/logo.png" alt="STORMS development" width={240} height={120} className="h-14 w-auto object-contain py-3" unoptimized />
                            )}
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-6">
                        {navigation.map((item) => (
                            <Link className="text-white/70 hover:text-white transition-colors text-sm font-medium" key={item.name} href={item.href}>{item.name}</Link>
                        ))}
                    </nav>
                </div>

                <div className="hidden md:block text-2xl font-semibold">
                    <Link href="/">
                        {branding?.logo_url ? (
                            <Image src={branding.logo_url} alt={branding.store_name || "STORMS development"} width={360} height={180} className="h-20 lg:h-24 w-auto object-contain py-3" unoptimized />
                        ) : (
                            <Image src="/logo.png" alt="STORMS development" width={360} height={180} className="h-20 lg:h-24 w-auto object-contain py-3" unoptimized />
                        )}
                    </Link>
                </div>

                <div className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 items-center space-x-1 md:static md:top-auto md:z-auto md:translate-y-0 md:space-x-4">
                    <div className={`relative flex items-center w-10 md:transition-all md:duration-300 ${isSearchOpen ? "md:w-64" : "md:w-10"}`}>
                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.input
                                    ref={searchInputRef}
                                    initial={{ opacity: 0, x: 8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 8 }}
                                    transition={{ duration: 0.18, ease: "easeOut" }}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Escape") {
                                            setIsSearchOpen(false);
                                            setSearchQuery("");
                                            searchInputRef.current?.blur();
                                        }
                                    }}
                                    placeholder="Buscar produtos..."
                                    className="absolute right-0 h-9 w-[calc(100vw-2rem)] max-w-52 rounded-full border border-white/20 bg-surface text-white placeholder:text-white/40 pr-10 pl-4 md:pl-8 text-sm outline-none focus:border-primary md:static md:w-full md:max-w-none shadow-lg"
                                />
                            )}
                        </AnimatePresence>
                        <button
                            onClick={handleSearchToggle}
                            className={`absolute left-0 p-2 text-white/70 hover:text-white transition-colors cursor-pointer z-10`}
                        >
                            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-6 h-6" />}
                        </button>
                        {searchQuery.trim() && isSearchOpen && (
                            <div className="absolute top-12 right-0 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-white/10 bg-background p-2 shadow-2xl z-[60]">
                                <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-white/40">Resultados</p>
                                <div className="max-h-60 overflow-y-auto">
                                    {isSearchLoading ? (
                                        <p className="px-3 py-2 text-sm text-white/50">Buscando produtos...</p>
                                    ) : searchError ? (
                                        <p className="px-3 py-2 text-sm text-white/50">{searchError}</p>
                                    ) : searchResults.length === 0 ? (
                                        <p className="px-3 py-2 text-sm text-white/50">Nenhum produto encontrado.</p>
                                    ) : (
                                        searchResults.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/product/${product.slug}`}
                                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/10"
                                                onClick={() => {
                                                    setIsSearchOpen(false);
                                                    setSearchQuery("");
                                                    searchInputRef.current?.blur();
                                                }}
                                            >
                                                <span className="relative h-12 w-10 shrink-0 overflow-hidden rounded-lg bg-dark">
                                                    <Image
                                                        src={product.images?.[0] || product.image}
                                                        alt={product.name}
                                                        fill
                                                        sizes="40px"
                                                        className="object-cover"
                                                    />
                                                </span>
                                                <span className="min-w-0 flex-1">
                                                    <span className="block truncate font-medium text-white">{product.name}</span>
                                                    <span className="block truncate text-xs text-white/50">{getCategoryName(product.category)}</span>
                                                </span>
                                                <span className="shrink-0 text-xs font-medium text-primary">{formatPrice(product.price)}</span>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className={`relative p-2 text-white/70 hover:text-white transition-colors cursor-pointer ${isSearchOpen ? "hidden md:block" : ""}`}
                    >
                        <ShoppingBag className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background text-[10px] font-bold text-white shadow-sm">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    {isAuthenticated ? (
                        <div ref={userMenuRef} className={`relative ${isSearchOpen ? "hidden md:block" : ""}`}>
                            <button
                                onClick={() => setIsUserMenuOpen((currentValue) => !currentValue)}
                                className="relative flex items-center gap-2 p-2 text-white/70 transition-colors hover:text-white cursor-pointer"
                                aria-label="Abrir menu da conta"
                                aria-expanded={isUserMenuOpen}
                            >
                                <User className="w-6 h-6" />
                            </button>

                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.16, ease: "easeOut" }}
                                        className="absolute right-0 top-12 z-[60] w-56 rounded-2xl border border-white/10 bg-background p-2 shadow-2xl"
                                    >
                                        <div className="border-b border-white/10 px-3 py-2">
                                            <p className="text-sm font-medium text-white">Olá, {user?.name}!</p>
                                        </div>

                                        <div className="py-2">
                                            {userMenuItems.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="block rounded-xl px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsUserMenuOpen(false);
                                            }}
                                            className="flex w-full rounded-xl px-3 py-2 text-sm text-left text-red-400 transition-colors hover:bg-white/10 cursor-pointer"
                                        >
                                            Sair
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link
                            href="/auth"
                            className={`relative p-2 text-white/70 hover:text-white transition-colors cursor-pointer ${isSearchOpen ? "hidden md:block" : ""}`}
                        >
                            <User className="w-6 h-6" />
                        </Link>
                    )}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`p-2 text-white/70 hover:text-white transition-colors cursor-pointer md:hidden ${isSearchOpen ? "hidden" : ""}`}
                        aria-label="Abrir menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="md:hidden absolute top-full left-0 w-full bg-background border-b border-white/10 rounded-b-2xl z-10 shadow-2xl"
                    >
                        <nav className="flex flex-col items-center space-y-4 py-4">
                            {navigation.map((item) => (
                                <Link
                                    className="text-white hover:text-primary transition-colors font-medium"
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
            <SidebarCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
    );
}