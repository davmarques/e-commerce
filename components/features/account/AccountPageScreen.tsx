"use client";

import { AccountProfileForm } from "@/components/features/account/AccountProfileForm";
import { AccountRegisterForm } from "@/components/features/account/AccountRegisterForm";
import { useAccountPage } from "@/features/account/hooks/useAccountPage";

export default function AccountPageScreen() {
	const account = useAccountPage();

	return (
		<section className="min-h-[calc(100vh-80px)] bg-background px-4 py-10 md:px-20 md:py-14">
			<div className="mx-auto max-w-4xl rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
				<p className="text-xs uppercase tracking-[0.3em] text-black/40">Area do cliente</p>
				<h1 className="mt-3 font-outfit text-3xl text-black md:text-5xl">Minha Conta</h1>
				<p className="mt-4 max-w-2xl text-sm leading-7 text-black/65 md:text-base">
					{account.isAuthenticated
						? "Atualize seus dados cadastrais e mantenha sua conta sempre em dia."
						: "Crie sua conta para salvar pedidos, favoritos e editar seus dados quando quiser."}
				</p>

				{account.isLoading ? (
					<div className="mt-8 rounded-2xl border border-black/10 bg-[#F3F3F3] p-4 text-sm text-black/60">
						Carregando dados da conta...
					</div>
				) : null}

				{!account.isLoading && !account.isAuthenticated ? (
					<AccountRegisterForm
						registerName={account.registerName}
						registerEmail={account.registerEmail}
						registerPassword={account.registerPassword}
						registerConfirmPassword={account.registerConfirmPassword}
						registerAcceptedTerms={account.registerAcceptedTerms}
						registerPasswordMismatch={account.registerPasswordMismatch}
						registerFeedback={account.registerFeedback}
						isRegistering={account.isRegistering}
						onRegisterNameChange={account.setRegisterName}
						onRegisterEmailChange={account.setRegisterEmail}
						onRegisterPasswordChange={account.setRegisterPassword}
						onRegisterConfirmPasswordChange={account.setRegisterConfirmPassword}
						onRegisterAcceptedTermsChange={account.setRegisterAcceptedTerms}
						onSubmit={account.handleRegister}
					/>
				) : null}

				{!account.isLoading && account.isAuthenticated ? (
					<AccountProfileForm
						name={account.name}
						email={account.email}
						cpf={account.cpf}
						phone={account.phone}
						zipCode={account.zipCode}
						street={account.street}
						number={account.number}
						complement={account.complement}
						neighborhood={account.neighborhood}
						city={account.city}
						state={account.state}
						isLoadingZipCode={account.isLoadingZipCode}
						zipCodeFeedback={account.zipCodeFeedback}
						profileFeedback={account.profileFeedback}
						isSavingProfile={account.isSavingProfile}
						savedAddresses={account.savedAddresses}
						activeAddressKey={account.activeAddressKey}
						onNameChange={account.setName}
						onEmailChange={account.setEmail}
						onCpfChange={account.setCpf}
						onPhoneChange={account.setPhone}
						onZipCodeChange={account.setZipCode}
						onStreetChange={account.setStreet}
						onNumberChange={account.setNumber}
						onComplementChange={account.setComplement}
						onNeighborhoodChange={account.setNeighborhood}
						onCityChange={account.setCity}
						onStateChange={account.setState}
						onSelectActiveAddress={account.setActiveAddressKey}
						onSubmit={account.handleUpdateProfile}
					/>
				) : null}
			</div>
		</section>
	);
}