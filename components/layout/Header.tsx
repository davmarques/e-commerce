"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import SidebarCart from "./SidebarCart";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
    { name: "Shop", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const { cartCount } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchOpen) {
            searchInputRef.current?.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    return (
        <header ref={menuRef} className="relative z-50">
            <div className="flex relative items-center justify-between py-4 px-4 md:px-20 border-b border-black/10 rounded-2xl">
                <div className="flex items-center md:space-x-4">

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    <nav className="hidden md:flex items-center space-x-4">
                        {navigation.map((item) => (
                            <Link className="text-black/60 hover:text-black" key={item.name} href={item.href}>{item.name}</Link>
                        ))}
                    </nav>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold">
                    <h1>E-Commerce</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className={`relative flex items-center transition-all duration-300 ${isSearchOpen ? "w-48 md:w-64" : "w-10"}`}>
                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.input
                                    ref={searchInputRef}
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "100%", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Buscar produtos..."
                                    className="h-9 w-full rounded-full border border-black/10 bg-secondary/50 pl-10 pr-4 text-sm outline-none focus:border-black/20"
                                />
                            )}
                        </AnimatePresence>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className={`absolute left-0 p-2 text-black/60 hover:text-black transition-colors cursor-pointer z-10`}
                        >
                            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-6 h-6" />}
                        </button>
                        {searchQuery && isSearchOpen && (
                            <div className="absolute top-12 right-0 w-64 rounded-xl border border-black/10 bg-white p-2 shadow-xl z-[60]">
                                <p className="px-3 py-2 text-[10px] uppercase tracking-widest text-black/40">Resultados</p>
                                {/* Aqui você filtraria seus produtos reais */}
                                <div className="max-h-60 overflow-y-auto">
                                    {/* Exemplo de link de resultado */}
                                    <Link
                                        href={`/collections?search=${searchQuery}`}
                                        className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary transition-colors"
                                        onClick={() => { setIsSearchOpen(false); setSearchQuery("") }}
                                    >
                                        Ver tudo para "{searchQuery}"
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 text-black/60 hover:text-black transition-colors cursor-pointer"
                    >
                        <ShoppingBag className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-black/10 rounded-b-2xl z-10 duration-300 ease-in-out"
                    >
                        <nav className="flex flex-col items-center space-y-4 py-4">
                            {navigation.map((item) => (
                                <Link
                                    className="text-black hover:text-black"
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)} // ADICIONE ISSO
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