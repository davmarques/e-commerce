"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthModeToggle } from "@/components/features/auth/AuthModeToggle";
import { AuthForm } from "@/components/features/auth/AuthForm";
import { AuthMode } from "@/components/features/auth/types";
import { useAuth } from "@/providers/AuthContext";

export default function AuthPage() {
	const router = useRouter();
	const { isAuthenticated, isLoading, login, signup } = useAuth();
	const [mode, setMode] = useState<AuthMode>("login");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [feedback, setFeedback] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isSignUp = mode === "signup";

	const passwordMismatch = useMemo(() => {
		if (!isSignUp) return false;
		if (!confirmPassword) return false;
		return password !== confirmPassword;
	}, [confirmPassword, isSignUp, password]);

	useEffect(() => {
		if (isAuthenticated) {
			router.replace("/");
		}
	}, [isAuthenticated, router]);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (isSignUp && passwordMismatch) {
			setFeedback("As senhas nao coincidem.");
			return;
		}

		if (isSignUp && !acceptedTerms) {
			setFeedback("Voce precisa aceitar os termos para criar uma conta.");
			return;
		}

		setIsSubmitting(true);

		try {
			if (isSignUp) {
				await signup({ name: fullName, email, password });
				setFeedback("Conta criada com sucesso. Redirecionando...");
			} else {
				await login({ email, password });
				setFeedback("Login efetuado com sucesso. Redirecionando...");
			}

			router.push("/");
		} catch (error) {
			setFeedback(error instanceof Error ? error.message : "Nao foi possivel autenticar.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-background px-4 py-10 md:px-20 md:py-14">
			

				<div className=" md:w-1/2 mx-auto rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8">
						<AuthModeToggle
							mode={mode}
							onModeChange={(nextMode) => {
								setMode(nextMode);
								setAcceptedTerms(false);
								setFeedback(null);
							}}
						/>

						<AuthForm
							mode={mode}
							fullName={fullName}
							email={email}
							password={password}
							confirmPassword={confirmPassword}
							acceptedTerms={acceptedTerms}
							passwordMismatch={passwordMismatch}
							feedback={feedback}
							onFullNameChange={setFullName}
							onEmailChange={setEmail}
							onPasswordChange={setPassword}
							onConfirmPasswordChange={setConfirmPassword}
							onAcceptedTermsChange={setAcceptedTerms}
							isSubmitting={isSubmitting || isLoading}
							onSubmit={handleSubmit}
						/>
				</div>
		</div>
	);
}
