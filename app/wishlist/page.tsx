"use client";

import Link from "next/link";
import ProductCard from "@/components/features/products/ProductCard";
import { useAuth } from "@/providers/AuthContext";
import { useWishlist } from "@/providers/WishlistContext";

export default function WishlistPage() {
	const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
	const { items, clearWishlist, isLoading } = useWishlist();

	return (
		<section className="min-h-[calc(100vh-80px)] bg-background px-4 py-10 md:px-20 md:py-14">
			<div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-brand-surface p-8 shadow-xl">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-[0.3em] text-brand-primary font-semibold">Favoritos</p>
						<h1 className="mt-3 font-outfit text-3xl text-white font-bold md:text-5xl">Lista de Desejos</h1>
						<p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
							Salve produtos para comparar depois e mantenha suas peças favoritas sempre por perto.
						</p>
					</div>

					{items.length > 0 && (
						<button
							type="button"
							onClick={clearWishlist}
							className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
						>
							Limpar favoritos
						</button>
					)}
				</div>
			</div>

			<div className="mx-auto mt-8 max-w-6xl">
				{!isAuthenticated && !isAuthLoading ? (
					<div className="rounded-3xl border border-dashed border-white/20 bg-brand-surface px-6 py-14 text-center shadow-xl">
						<h2 className="font-outfit text-2xl text-white font-bold">Entre para ver seus favoritos</h2>
						<p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/60">
							Seus favoritos são vinculados à sua conta.
						</p>
						<Link
							href="/auth"
							className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-brand-primary px-6 text-sm text-white font-medium shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90"
						>
							Fazer login
						</Link>
					</div>
				) : isLoading || isAuthLoading ? (
					<div className="rounded-3xl border border-white/10 bg-brand-surface px-6 py-14 text-center shadow-xl text-sm text-white/60">
						Carregando favoritos...
					</div>
				) : items.length > 0 ? (
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{items.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				) : (
					<div className="rounded-3xl border border-dashed border-white/20 bg-brand-surface px-6 py-14 text-center shadow-xl">
						<h2 className="font-outfit text-2xl text-white font-bold">Sua lista está vazia</h2>
						<p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/60">
							Use o ícone de coração nos produtos para montar sua seleção favorita.
						</p>
						<Link
							href="/collections"
							className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-brand-primary px-6 text-sm text-white font-medium shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90"
						>
							Explorar produtos
						</Link>
					</div>
				)}
			</div>
		</section>
	);
}