"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/features/cart/hooks/useCart";
import { useAuth } from "@/providers/AuthContext";
import SidebarCart from "../features/cart/SidebarCart";
import { ShoppingBag, Search, X, User, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
    { name: "Shop", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useCart();
    const { isAuthenticated, user, logout } = useAuth();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
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
            <div className="flex relative items-center justify-between py-4 px-4 md:px-20 border-b border-black/10 rounded-2xl">
                <div className="flex items-center md:space-x-4">
                    <div className="md:hidden text-xl font-semibold">
                        <h1>E-Commerce</h1>
                    </div>

                    <nav className="hidden md:flex items-center space-x-4">
                        {navigation.map((item) => (
                            <Link className="text-black/60 hover:text-black" key={item.name} href={item.href}>{item.name}</Link>
                        ))}
                    </nav>
                </div>

                <div className="hidden md:block text-2xl font-semibold">
                    <h1>E-Commerce</h1>
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
                                    className="absolute right-0 h-9 w-[calc(100vw-2rem)] max-w-52 rounded-full border border-black/10 bg-secondary/95 pr-10 pl-4 md:pl-8 text-sm outline-none focus:border-black/20 md:static md:w-full md:max-w-none md:bg-secondary/50"
                                />
                            )}
                        </AnimatePresence>
                        <button
                            onClick={handleSearchToggle}
                            className={`absolute left-0 p-2 text-black/60 hover:text-black transition-colors cursor-pointer z-10`}
                        >
                            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-6 h-6" />}
                        </button>
                        {searchQuery.trim() && isSearchOpen && (
                            <div className="absolute top-12 right-0 w-64 rounded-xl border border-black/10 bg-white p-2 shadow-xl z-[60]">
                                <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-black/40">Resultados</p>
                                {/* Aqui você filtraria seus produtos reais */}
                                <div className="max-h-60 overflow-y-auto">
                                    {/* Exemplo de link de resultado */}
                                    <Link
                                        href={`/collections?search=${searchQuery}`}
                                        className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary transition-colors"
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            setSearchQuery("");
                                            searchInputRef.current?.blur();
                                        }}
                                    >
                                        Ver tudo para &quot;{searchQuery}&quot;
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className={`relative p-2 text-black/60 hover:text-black transition-colors cursor-pointer ${isSearchOpen ? "hidden md:block" : ""}`}
                    >
                        <ShoppingBag className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    {isAuthenticated ? (
                        <div ref={userMenuRef} className={`relative ${isSearchOpen ? "hidden md:block" : ""}`}>
                            <button
                                onClick={() => setIsUserMenuOpen((currentValue) => !currentValue)}
                                className="relative flex items-center gap-2 p-2 text-black/60 transition-colors hover:text-black cursor-pointer"
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
                                        className="absolute right-0 top-12 z-[60] w-56 rounded-2xl border border-black/10 bg-white p-2 shadow-xl"
                                    >
                                        <div className="border-b border-black/10 px-3 py-2">
                                            <p className="text-sm font-medium text-black">Olá, {user?.name}!</p>
                                        </div>

                                        <div className="py-2">
                                            {userMenuItems.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="block rounded-xl px-3 py-2 text-sm text-black/70 transition-colors hover:bg-secondary hover:text-black"
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
                                            className="flex w-full rounded-xl px-3 py-2 text-sm text-left text-black/70 transition-colors hover:bg-secondary hover:text-black cursor-pointer"
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
                            className={`relative p-2 text-black/60 hover:text-black transition-colors cursor-pointer ${isSearchOpen ? "hidden md:block" : ""}`}
                        >
                            <User className="w-6 h-6" />
                        </Link>
                    )}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`p-2 text-black/60 hover:text-black transition-colors cursor-pointer md:hidden ${isSearchOpen ? "hidden" : ""}`}
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
                        className="md:hidden absolute top-full left-0 w-full bg-background border-b border-black/10 rounded-b-2xl z-10"
                    >
                        <nav className="flex flex-col items-center space-y-4 py-4">
                            {navigation.map((item) => (
                                <Link
                                    className="text-black hover:text-black/70"
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