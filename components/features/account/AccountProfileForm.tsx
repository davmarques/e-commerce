import { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowDownIcon } from "lucide-react";

interface AccountProfileFormProps {
	savedAddresses: Array<{
		key: string;
		zipCode: string;
		street: string;
		number: string;
		complement: string;
		neighborhood: string;
		city: string;
		state: string;
	}>;
	activeAddressKey: string | null;
	name: string;
	email: string;
	cpf: string;
	phone: string;
	zipCode: string;
	street: string;
	number: string;
	complement: string;
	neighborhood: string;
	city: string;
	state: string;
	isLoadingZipCode: boolean;
	zipCodeFeedback: string | null;
	profileFeedback: string | null;
	isSavingProfile: boolean;
	onNameChange: (value: string) => void;
	onEmailChange: (value: string) => void;
	onCpfChange: (value: string) => void;
	onPhoneChange: (value: string) => void;
	onZipCodeChange: (value: string) => void;
	onStreetChange: (value: string) => void;
	onNumberChange: (value: string) => void;
	onComplementChange: (value: string) => void;
	onNeighborhoodChange: (value: string) => void;
	onCityChange: (value: string) => void;
	onStateChange: (value: string) => void;
	onSelectActiveAddress: (value: string) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function AccountProfileForm({
	savedAddresses,
	activeAddressKey,
	name,
	email,
	cpf,
	phone,
	zipCode,
	street,
	number,
	complement,
	neighborhood,
	city,
	state,
	isLoadingZipCode,
	zipCodeFeedback,
	profileFeedback,
	isSavingProfile,
	onNameChange,
	onEmailChange,
	onCpfChange,
	onPhoneChange,
	onZipCodeChange,
	onStreetChange,
	onNumberChange,
	onComplementChange,
	onNeighborhoodChange,
	onCityChange,
	onStateChange,
	onSelectActiveAddress,
	onSubmit,
}: AccountProfileFormProps) {
	return (
		<form onSubmit={onSubmit} className="mt-8 space-y-4">
			<h2 className="font-outfit text-2xl text-white font-bold">Dados cadastrais</h2>
			<div className="grid gap-4 md:grid-cols-2">
				<Input
					value={name}
					onChange={(event) => onNameChange(event.target.value)}
					placeholder="Nome completo"
					autoComplete="name"
					required
				/>
				<Input
					value={email}
					onChange={(event) => onEmailChange(event.target.value)}
					type="email"
					placeholder="Seu e-mail"
					autoComplete="email"
					required
				/>
				<Input
					value={cpf}
					onChange={(event) => onCpfChange(event.target.value)}
					placeholder="CPF"
					autoComplete="off"
				/>
				<Input
					value={phone}
					onChange={(event) => onPhoneChange(event.target.value)}
					placeholder="Telefone"
					autoComplete="tel"
				/>
			</div>

			{savedAddresses.length > 0 ? (
				<div className="rounded-2xl border border-white/10 bg-brand-dark p-4">
					<h3 className="font-outfit text-xl text-white font-semibold">Endereços</h3>
					<div className="mt-3 space-y-3">
						{savedAddresses.map((address, index) => (
							<button
								type="button"
								key={`${address.key}-${index}`}
								onClick={() => onSelectActiveAddress(address.key)}
								className={`w-full rounded-xl border p-3 text-left text-sm transition cursor-pointer ${activeAddressKey === address.key
										? "border-brand-primary bg-brand-surface text-white ring-1 ring-brand-primary"
										: "border-white/10 bg-brand-surface/50 text-white/75 hover:border-white/30"
									}`}
							>
								<div className="mb-2 flex items-center justify-between">
									<p className="font-medium text-white">
										{address.street}, {address.number}
									</p>
									{activeAddressKey === address.key ? (
										<span className="rounded-full border border-brand-primary bg-brand-primary/20 text-brand-primary px-2 py-1 text-xs font-semibold">Ativo</span>
									) : (
										<span className="rounded-full border border-white/20 px-2 py-1 text-xs text-white/60">Selecionar</span>
									)}
								</div>
								<p className="text-white/70">
									{address.neighborhood} - {address.city}/{address.state}
								</p>
								<p className="text-white/50 text-xs mt-1">CEP: {address.zipCode}</p>
								{address.complement ? <p className="text-white/50 text-xs">Complemento: {address.complement}</p> : null}
							</button>
						))}
					</div>
				</div>
			) : null}

			<div className="rounded-2xl border border-white/10 bg-brand-dark">
				<details className="group" open={false}>
					<summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-outfit text-xl text-white [&::-webkit-details-marker]:hidden">
						Novo endereço
						<span className="text-sm text-white/60 transition-transform group-open:rotate-180"><ArrowDownIcon className="h-4 w-4" /></span>
					</summary>
					<div className="grid gap-4 border-t border-white/10 px-4 py-4 md:grid-cols-2">
						<Input
							value={zipCode}
							onChange={(event) => onZipCodeChange(event.target.value)}
							placeholder="CEP"
							autoComplete="postal-code"
							error={zipCodeFeedback || undefined}
						/>
						<Input
							value={street}
							onChange={(event) => onStreetChange(event.target.value)}
							placeholder="Rua"
							autoComplete="address-line1"
							disabled={isLoadingZipCode}
						/>
						<Input
							value={number}
							onChange={(event) => onNumberChange(event.target.value)}
							placeholder="Número"
							autoComplete="address-line2"
						/>
						<Input
							value={complement}
							onChange={(event) => onComplementChange(event.target.value)}
							placeholder="Complemento"
							autoComplete="off"
						/>
						<Input
							value={state}
							onChange={(event) => onStateChange(event.target.value)}
							placeholder="Estado"
							autoComplete="address-level1"
							disabled={isLoadingZipCode}
						/>
						<Input
							value={neighborhood}
							onChange={(event) => onNeighborhoodChange(event.target.value)}
							placeholder="Bairro"
							autoComplete="address-level3"
							disabled={isLoadingZipCode}
						/>
						<Input
							value={city}
							onChange={(event) => onCityChange(event.target.value)}
							placeholder="Cidade"
							autoComplete="address-level2"
							disabled={isLoadingZipCode}
						/>
					</div>
				</details>
			</div>

			{isLoadingZipCode ? <p className="text-sm text-white/60">Buscando endereço pelo CEP...</p> : null}

			<Button
				type="submit"
				size="lg"
				disabled={isSavingProfile}
				className="w-full rounded-xl bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 font-medium cursor-pointer"
			>
				{isSavingProfile ? "Salvando..." : "Salvar alterações"}
			</Button>

			{profileFeedback ? (
				<p className="rounded-xl border border-white/10 bg-brand-dark px-4 py-3 text-sm text-white/80">
					{profileFeedback}
				</p>
			) : null}
		</form>
	);
}