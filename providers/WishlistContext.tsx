"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { addFavorite, fetchFavorites, removeFavorite as removeFavoriteRequest } from "@/app/services/api";
import { Product } from "@/app/types/product";
import { normalizeProducts } from "@/app/types/product";
import { useAuth } from "@/providers/AuthContext";

interface WishlistContextType {
	items: Product[];
	isLoading: boolean;
	wishlistCount: number;
	isFavorite: (productId: string) => boolean;
	toggleFavorite: (product: Product) => Promise<void>;
	removeFavorite: (productId: string) => Promise<void>;
	clearWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, isLoading: isAuthLoading, token } = useAuth();
	const [items, setItems] = useState<Product[]>([]);
	const [loadedToken, setLoadedToken] = useState<string | null>(null);
	const [isMutating, setIsMutating] = useState(false);

	useEffect(() => {
		if (isAuthLoading) {
			return;
		}

		if (!isAuthenticated || !token) {
			return;
		}

		let cancelled = false;

		void fetchFavorites(token)
			.then((favorites) => {
				if (!cancelled) {
					setLoadedToken(token);
					setItems(normalizeProducts(favorites));
				}
			})
			.catch(() => {
				if (!cancelled) {
					setLoadedToken(null);
					setItems([]);
				}
			})
			.finally(() => undefined);

		return () => {
			cancelled = true;
		};
	}, [isAuthenticated, isAuthLoading, token]);

	const isFavorite = (productId: string) => {
		return items.some((item) => item.id === productId);
	};

	const toggleFavorite = async (product: Product) => {
		if (!token) {
			throw new Error("Faca login para salvar favoritos.");
		}

		const alreadyFavorite = isFavorite(product.id);

		if (alreadyFavorite) {
			await removeFavorite(product.id);
			return;
		}

		setIsMutating(true);

		try {
			await addFavorite(product.id, token);
			setItems((currentItems) => {
				if (currentItems.some((item) => item.id === product.id)) {
					return currentItems;
				}

				return [...currentItems, product];
			});
		} finally {
			setIsMutating(false);
		}
	};

	const removeFavorite = async (productId: string) => {
		if (!token) {
			throw new Error("Faca login para salvar favoritos.");
		}

		setIsMutating(true);

		try {
			await removeFavoriteRequest(productId, token);
			setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
		} finally {
			setIsMutating(false);
		}
	};

	const clearWishlist = async () => {
		await Promise.all(items.map((item) => removeFavorite(item.id)));
	};

	const visibleItems = isAuthenticated ? items : [];
	const isLoading = isMutating || Boolean(token && loadedToken !== token);

	return (
		<WishlistContext.Provider
			value={{
				items: visibleItems,
				isLoading,
				wishlistCount: visibleItems.length,
				isFavorite,
				toggleFavorite,
				removeFavorite,
				clearWishlist,
			}}
		>
			{children}
		</WishlistContext.Provider>
	);
}

export function useWishlist() {
	const context = useContext(WishlistContext);

	if (context === undefined) {
		throw new Error("useWishlist deve ser usado dentro de um WishlistProvider");
	}

	return context;
}