"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CartItem } from "@/components/features/cart/CartItem";
import { useCart } from "@/features/cart/hooks/useCart";
import { useAuth } from "@/providers/AuthContext";
import { createOrder, createPixPayment } from "@/app/services/api";

export default function CartPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const { isAuthenticated, token, user } = useAuth();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState("");

    const shipping = 20.00;
    const total = cartTotal + shipping;

    async function handleCheckout() {
        if (!isAuthenticated || !token || !user) {
            router.push("/auth");
            return;
        }

        if (!user.cpf || !user.phone || user.addresses.length === 0) {
            router.push("/account");
            return;
        }

        setCheckoutError("");
        setIsCheckingOut(true);

        try {
            const order = await createOrder(token, {
                items: cart.map((item) => ({
                    productId: item.id,
                    size: item.selectedVariant ?? "",
                    quantity: item.quantity,
                })),
                shippingCost: shipping,
            });

            const payment = await createPixPayment({
                orderId: order.id,
                amount: order.totalAmount,
                email: user.email,
            });

            if (!payment.ticketUrl) {
                throw new Error("Pagamento criado, mas o link do Mercado Pago nao foi retornado.");
            }

            clearCart();
            window.location.href = payment.ticketUrl;
        } catch (error) {
            setCheckoutError(error instanceof Error ? error.message : "Nao foi possivel finalizar a compra.");
        } finally {
            setIsCheckingOut(false);
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <main className="flex-1 container-tight py-12 px-4 md:px-20">
                <div className="max-w-4xl mx-auto">
                    {/* Navegação de volta */}
                    <Link 
                        href="/collections" 
                        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Continuar Comprando
                    </Link>

                    <h1 className="text-4xl font-semibold font-display mb-12 text-white">Seu Carrinho</h1>

                    {cart.length === 0 ? (
                        /* Estado Vazio */
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-brand-surface">
                            <p className="text-white/60 mb-6 font-figtree">Seu carrinho está vazio.</p>
                            <Link 
                                href="/collections" 
                                className="inline-flex h-12 items-center px-8 rounded-full bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 transition-all cursor-pointer font-medium"
                            >
                                Explorar Coleções
                            </Link>
                        </div>
                    ) : (
                        /* Grid do Carrinho */
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            {/* Lista de Itens */}
                            <div className="lg:col-span-8">
                                <div className="border-t border-white/10">
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
                                <div className="bg-brand-surface border border-white/10 rounded-2xl p-8 shadow-xl">
                                    <h2 className="text-lg font-semibold mb-6 font-display text-white">Resumo</h2>
                                    
                                    <div className="space-y-4 font-figtree">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/60">Subtotal</span>
                                            <span className="font-medium text-white">R$ {cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/60">Frete estimado</span>
                                            <span className="font-medium text-white">R$ {shipping.toFixed(2)}</span>
                                        </div>
                                        
                                        <div className="h-px bg-white/10 my-4" />
                                        
                                        <div className="flex justify-between font-semibold text-lg text-white">
                                            <span>Total</span>
                                            <span className="text-brand-primary">R$ {total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {checkoutError ? (
                                        <p className="mt-4 text-xs text-red-400 text-center">{checkoutError}</p>
                                    ) : null}

                                    <button
                                        onClick={() => void handleCheckout()}
                                        disabled={isCheckingOut}
                                        className="w-full mt-8 h-14 bg-brand-primary text-white rounded-full font-medium hover:bg-brand-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isCheckingOut ? "Gerando pagamento..." : "Finalizar Compra"}
                                    </button>

                                    <p className="mt-4 text-[10px] text-center text-white/40 uppercase tracking-[0.2em] font-medium">
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