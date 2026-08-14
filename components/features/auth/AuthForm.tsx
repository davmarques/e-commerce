import { FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AuthMode } from "@/components/features/auth/types";

interface AuthFormProps {
    mode: AuthMode;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptedTerms: boolean;
    passwordMismatch: boolean;
    feedback: string | null;
    isSubmitting: boolean;
    onFullNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onConfirmPasswordChange: (value: string) => void;
    onAcceptedTermsChange: (value: boolean) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function AuthForm({
    mode,
    fullName,
    email,
    password,
    confirmPassword,
    acceptedTerms,
    passwordMismatch,
    feedback,
    isSubmitting,
    onFullNameChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
    onAcceptedTermsChange,
    onSubmit,
}: AuthFormProps) {
    const isSignUp = mode === "signup";

    return (
        <>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
                {isSignUp && (
                    <Input
                        value={fullName}
                        onChange={(event) => onFullNameChange(event.target.value)}
                        placeholder="Nome completo"
                        autoComplete="name"
                        required
                    />
                )}

                <Input
                    value={email}
                    onChange={(event) => onEmailChange(event.target.value)}
                    type="email"
                    placeholder="Seu e-mail"
                    autoComplete="email"
                    required
                />

                <Input
                    value={password}
                    onChange={(event) => onPasswordChange(event.target.value)}
                    type="password"
                    placeholder="Sua senha"
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                    required
                />

                {isSignUp && (
                    <>
                        <Input
                            value={confirmPassword}
                            onChange={(event) => onConfirmPasswordChange(event.target.value)}
                            type="password"
                            placeholder="Confirme sua senha"
                            autoComplete="new-password"
                            error={passwordMismatch ? "As senhas nao coincidem." : undefined}
                            required
                        />

                        <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-black/70">
                            <input
                                type="checkbox"
                                name="accept-terms"
                                checked={acceptedTerms}
                                onChange={(event) => onAcceptedTermsChange(event.target.checked)}
                                className="h-4 w-4 border-black/30 accent-black focus:ring-black"
                                required
                            />
                            Li e concordo com os termos e politica de privacidade.
                        </label>
                    </>
                )}

                <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || (isSignUp && !acceptedTerms)}
                    className="mt-2 w-full rounded-xl bg-black text-white hover:bg-black/90"
                >
                    {isSubmitting ? (isSignUp ? "Criando conta..." : "Entrando...") : (isSignUp ? "Criar conta" : "Entrar")}
                </Button>

                {feedback && (
                    <p className="rounded-xl border border-black/10 bg-[#F3F3F3] px-4 py-3 text-sm text-black/70">
                        {feedback}
                    </p>
                )}
            </form>


        </>
    );
}
