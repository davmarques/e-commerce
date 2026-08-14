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
			<h2 className="font-outfit text-2xl text-black">Dados cadastrais</h2>
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
				<div className="rounded-2xl border border-black/10  p-4">
					<h3 className="font-outfit text-xl text-black">Endereços</h3>
					<div className="mt-3 space-y-3">
						{savedAddresses.map((address, index) => (
							<button
								type="button"
								key={`${address.key}-${index}`}
								onClick={() => onSelectActiveAddress(address.key)}
								className={`w-full rounded-xl border p-3 text-left text-sm transition ${activeAddressKey === address.key
										? "border-black text-black"
										: "border-black/10 bg-white text-black/75 hover:border-black/30"
									}`}
							>
								<div className="mb-2 flex items-center justify-between">
									<p className="font-medium">
										{address.street}, {address.number}
									</p>
									{activeAddressKey === address.key ? (
										<span className="rounded-full border border-white/35 px-2 py-1 text-xs">Ativo</span>
									) : (
										<span className="rounded-full border border-black/20 px-2 py-1 text-xs">Selecionar</span>
									)}
								</div>
								<p>
									{address.neighborhood} - {address.city}/{address.state}
								</p>
								<p>CEP: {address.zipCode}</p>
								{address.complement ? <p>Complemento: {address.complement}</p> : null}
							</button>
						))}
					</div>
				</div>
			) : null}

			<div className="rounded-2xl border border-black/10">
				<details className="group" open={false}>
					<summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-outfit text-xl text-black [&::-webkit-details-marker]:hidden">
						Novo endereco
						<span className="text-sm text-black/60 transition-transform group-open:rotate-180"><ArrowDownIcon className="h-4 w-4" /></span>
					</summary>
					<div className="grid gap-4 border-t border-black/10 px-4 py-4 md:grid-cols-2">
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
							placeholder="Numero"
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

			{isLoadingZipCode ? <p className="text-sm text-black/55">Buscando endereco pelo CEP...</p> : null}



			<Button
				type="submit"
				size="lg"
				disabled={isSavingProfile}
				className="w-full rounded-xl bg-black text-white hover:bg-black/90"
			>
				{isSavingProfile ? "Salvando..." : "Salvar alterações"}
			</Button>

			{profileFeedback ? (
				<p className="rounded-xl border border-black/10 bg-[#F3F3F3] px-4 py-3 text-sm text-black/70">
					{profileFeedback}
				</p>
			) : null}
		</form>
	);
}