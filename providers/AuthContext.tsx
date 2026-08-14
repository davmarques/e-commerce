"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ApiAuthUser, fetchCurrentUser, loginUser, signupUser, updateCurrentUser } from "@/app/services/api";

interface AuthSession {
	token: string;
	user: ApiAuthUser;
}

function getStoredSession() {
	if (typeof window === "undefined") {
		return null;
	}

	const savedSession = localStorage.getItem(AUTH_STORAGE_KEY);

	if (!savedSession) {
		return null;
	}

	try {
		return JSON.parse(savedSession) as AuthSession;
	} catch {
		localStorage.removeItem(AUTH_STORAGE_KEY);
		return null;
	}
}

interface LoginPayload {
	email: string;
	password: string;
}

interface SignUpPayload extends LoginPayload {
	name: string;
}

interface UpdateProfilePayload {
	name?: string;
	email?: string;
	cpf?: string;
	phone?: string;
	address?: {
		zipCode: string;
		street: string;
		number: string;
		complement?: string;
		neighborhood: string;
		city: string;
		state: string;
		isDefault?: boolean;
	};
}

interface AuthContextType {
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	user: ApiAuthUser | null;
	login: (payload: LoginPayload) => Promise<void>;
	signup: (payload: SignUpPayload) => Promise<void>;
	updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
	logout: () => void;
}

const AUTH_STORAGE_KEY = "forma-auth-session";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [session, setSession] = useState<AuthSession | null>(null);
	const [validatedToken, setValidatedToken] = useState<string | null>(null);
	const [isMutating, setIsMutating] = useState(false);
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setSession(getStoredSession());
		setIsHydrated(true);
	}, []);

	useEffect(() => {
		if (!isHydrated) {
			return;
		}

		if (session) {
			localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
			return;
		}

		localStorage.removeItem(AUTH_STORAGE_KEY);
	}, [isHydrated, session]);

	useEffect(() => {
		if (!session?.token) {
			return;
		}

		let cancelled = false;

		void fetchCurrentUser(session.token)
			.then((user) => {
				if (!cancelled) {
					setValidatedToken(session.token);
					setSession((currentSession) => {
						if (!currentSession) {
							return null;
						}

						return { ...currentSession, user };
					});
				}
			})
			.catch(() => {
				if (!cancelled) {
					setValidatedToken(null);
					setSession(null);
				}
			})
			.finally(() => undefined);

		return () => {
			cancelled = true;
		};
	}, [session?.token]);

	const login = async ({ email, password }: LoginPayload) => {
		setIsMutating(true);

		try {
			const authResponse = await loginUser({ email, password });
			setValidatedToken(authResponse.token);
			setSession(authResponse);
		} finally {
			setIsMutating(false);
		}
	};

	const signup = async ({ name, email, password }: SignUpPayload) => {
		setIsMutating(true);

		try {
			const authResponse = await signupUser({ name, email, password });
			setValidatedToken(authResponse.token);
			setSession(authResponse);
		} finally {
			setIsMutating(false);
		}
	};

	const logout = () => {
		setValidatedToken(null);
		setSession(null);
	};

	const updateProfile = async (payload: UpdateProfilePayload) => {
		if (!session?.token) {
			throw new Error("Voce precisa estar autenticado para atualizar seus dados.");
		}

		setIsMutating(true);

		try {
			const updatedUser = await updateCurrentUser(session.token, payload);
			setSession((currentSession) => {
				if (!currentSession) {
					return null;
				}

				return { ...currentSession, user: updatedUser };
			});
		} finally {
			setIsMutating(false);
		}
	};

	const isLoading = isMutating || Boolean(session?.token && validatedToken !== session.token);

	return (
		<AuthContext.Provider
			value={{
				token: session?.token || null,
				isAuthenticated: Boolean(session?.token),
				isLoading,
				user: session?.user || null,
				login,
				signup,
				updateProfile,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}

	return context;
}
