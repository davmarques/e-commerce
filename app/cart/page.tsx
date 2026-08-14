"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CartItem } from "@/components/features/cart/CartItem";
import { useCart } from "@/features/cart/hooks/useCart";

export default function CartPage() {
    const { cart, cartTotal } = useCart();

    const shipping = 20.00;
    const total = cartTotal + shipping;

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <main className="flex-1 container-tight py-12 px-4 md:px-20">
                <div className="max-w-4xl mx-auto">
                    {/* Navegação de volta */}
                    <Link 
                        href="/collections" 
                        className="inline-flex items-center gap-2 text-sm text-black/40 hover:text-black mb-8 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Continuar Comprando
                    </Link>

                    <h1 className="text-4xl font-semibold font-display mb-12">Seu Carrinho</h1>

                    {cart.length === 0 ? (
                        /* Estado Vazio */
                        <div className="text-center py-20 border border-dashed border-black/10 rounded-2xl">
                            <p className="text-black/40 mb-6 font-figtree">Seu carrinho está vazio.</p>
                            <Link 
                                href="/collections" 
                                className="inline-flex h-12 items-center px-8 rounded-full bg-black text-white hover:bg-black/90 transition-all cursor-pointer font-medium"
                            >
                                Explorar Coleções
                            </Link>
                        </div>
                    ) : (
                        /* Grid do Carrinho */
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            {/* Lista de Itens */}
                            <div className="lg:col-span-8">
                                <div className="border-t border-black/5">
                                    {cart.map((item) => (
                                        <CartItem 
                                            key={item.id + (item.selectedVariant || '')} 
                                            item={item} 
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Resumo do Pedido */}
                            <div className="lg:col-span-4 self-start">
                                <div className="bg-secondary/50 rounded-2xl p-8">
                                    <h2 className="text-lg font-semibold mb-6 font-display">Resumo</h2>
                                    
                                    <div className="space-y-4 font-figtree">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-black/40">Subtotal</span>
                                            <span className="font-medium text-black">R$ {cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-black/40">Frete estimado</span>
                                            <span className="font-medium text-black">R$ {shipping.toFixed(2)}</span>
                                        </div>
                                        
                                        <div className="h-px bg-black/5 my-4" />
                                        
                                        <div className="flex justify-between font-semibold text-lg text-black">
                                            <span>Total</span>
                                            <span>R$ {total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button 
                                        className="w-full mt-8 h-14 bg-black text-white rounded-full font-medium hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-black/5"
                                    >
                                        Finalizar Compra
                                    </button>

                                    <p className="mt-4 text-[10px] text-center text-black/30 uppercase tracking-[0.2em] font-medium">
                                        Checkout Seguro • SSL Encrypted
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}