import { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface AccountRegisterFormProps {
	registerName: string;
	registerEmail: string;
	registerPassword: string;
	registerConfirmPassword: string;
	registerAcceptedTerms: boolean;
	registerPasswordMismatch: boolean;
	registerFeedback: string | null;
	isRegistering: boolean;
	onRegisterNameChange: (value: string) => void;
	onRegisterEmailChange: (value: string) => void;
	onRegisterPasswordChange: (value: string) => void;
	onRegisterConfirmPasswordChange: (value: string) => void;
	onRegisterAcceptedTermsChange: (value: boolean) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function AccountRegisterForm({
	registerName,
	registerEmail,
	registerPassword,
	registerConfirmPassword,
	registerAcceptedTerms,
	registerPasswordMismatch,
	registerFeedback,
	isRegistering,
	onRegisterNameChange,
	onRegisterEmailChange,
	onRegisterPasswordChange,
	onRegisterConfirmPasswordChange,
	onRegisterAcceptedTermsChange,
	onSubmit,
}: AccountRegisterFormProps) {
	return (
		<form onSubmit={onSubmit} className="mt-8 space-y-4">
			<h2 className="font-outfit text-2xl text-white font-bold">Cadastro</h2>
			<Input
				value={registerName}
				onChange={(event) => onRegisterNameChange(event.target.value)}
				placeholder="Nome completo"
				autoComplete="name"
				required
			/>
			<Input
				value={registerEmail}
				onChange={(event) => onRegisterEmailChange(event.target.value)}
				type="email"
				placeholder="Seu e-mail"
				autoComplete="email"
				required
			/>
			<Input
				value={registerPassword}
				onChange={(event) => onRegisterPasswordChange(event.target.value)}
				type="password"
				placeholder="Crie uma senha"
				autoComplete="new-password"
				required
			/>
			<Input
				value={registerConfirmPassword}
				onChange={(event) => onRegisterConfirmPasswordChange(event.target.value)}
				type="password"
				placeholder="Confirme sua senha"
				autoComplete="new-password"
				error={registerPasswordMismatch ? "As senhas não coincidem." : undefined}
				required
			/>

			<label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-white/70">
				<input
					type="checkbox"
					name="accept-terms"
					checked={registerAcceptedTerms}
					onChange={(event) => onRegisterAcceptedTermsChange(event.target.checked)}
					className="h-4 w-4 border-white/30 accent-brand-primary focus:ring-brand-primary"
					required
				/>
				Li e concordo com os termos e política de privacidade.
			</label>

			<Button
				type="submit"
				size="lg"
				disabled={isRegistering || !registerAcceptedTerms || registerPasswordMismatch}
				className="w-full rounded-xl bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 font-medium cursor-pointer"
			>
				{isRegistering ? "Criando conta..." : "Criar conta"}
			</Button>

			{registerFeedback ? (
				<p className="rounded-xl border border-white/10 bg-brand-dark px-4 py-3 text-sm text-white/80">
					{registerFeedback}
				</p>
			) : null}
		</form>
	);
}