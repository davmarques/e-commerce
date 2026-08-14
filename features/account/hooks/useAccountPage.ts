"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/providers/AuthContext";

interface SavedAddress {
	key: string;
	zipCode: string;
	street: string;
	number: string;
	complement: string;
	neighborhood: string;
	city: string;
	state: string;
}

interface ViaCepResponse {
	cep?: string;
	logradouro?: string;
	bairro?: string;
	localidade?: string;
	uf?: string;
	erro?: boolean;
}

function normalizeZipCode(value: string) {
	return value.replace(/\D/g, "").slice(0, 8);
}

function formatZipCode(value: string) {
	const digits = normalizeZipCode(value);

	if (digits.length <= 5) {
		return digits;
	}

	return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function buildAddressKey(address: Omit<SavedAddress, "key">) {
	const normalizedZipCode = normalizeZipCode(address.zipCode);
	return [
		normalizedZipCode,
		address.street.trim().toLowerCase(),
		address.number.trim().toLowerCase(),
		address.neighborhood.trim().toLowerCase(),
		address.city.trim().toLowerCase(),
		address.state.trim().toLowerCase(),
	].join("|");
}

export function useAccountPage() {
	const { isAuthenticated, isLoading, user, signup, updateProfile } = useAuth();

	const [registerName, setRegisterName] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
	const [registerAcceptedTerms, setRegisterAcceptedTerms] = useState(false);
	const [registerFeedback, setRegisterFeedback] = useState<string | null>(null);
	const [isRegistering, setIsRegistering] = useState(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [cpf, setCpf] = useState("");
	const [phone, setPhone] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [street, setStreet] = useState("");
	const [number, setNumber] = useState("");
	const [complement, setComplement] = useState("");
	const [neighborhood, setNeighborhood] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [isLoadingZipCode, setIsLoadingZipCode] = useState(false);
	const [zipCodeFeedback, setZipCodeFeedback] = useState<string | null>(null);
	const [profileFeedback, setProfileFeedback] = useState<string | null>(null);
	const [isSavingProfile, setIsSavingProfile] = useState(false);
	const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
	const [activeAddressKey, setActiveAddressKey] = useState<string | null>(null);

	const registerPasswordMismatch = useMemo(() => {
		if (!registerConfirmPassword) {
			return false;
		}

		return registerPassword !== registerConfirmPassword;
	}, [registerConfirmPassword, registerPassword]);

	useEffect(() => {
		if (!user) {
			setSavedAddresses([]);
			setActiveAddressKey(null);
			return;
		}

		const defaultAddress = user.addresses.find((address) => address.isDefault) || user.addresses[0];
		let cancelled = false;

		queueMicrotask(() => {
			if (cancelled) {
				return;
			}

			setName(user.name);
			setEmail(user.email);
			setCpf(user.cpf || "");
			setPhone(user.phone || "");

			const mappedAddresses = user.addresses.map((address) => {
				const mappedAddressBase = {
					zipCode: formatZipCode(address.zipCode || ""),
					street: address.street || "",
					number: address.number || "",
					complement: address.complement || "",
					neighborhood: address.neighborhood || "",
					city: address.city || "",
					state: address.state || "",
				};

				return {
					key: buildAddressKey(mappedAddressBase),
					...mappedAddressBase,
				};
			});

			const defaultAddressKey = defaultAddress
				? buildAddressKey({
					zipCode: formatZipCode(defaultAddress.zipCode || ""),
					street: defaultAddress.street || "",
					number: defaultAddress.number || "",
					complement: defaultAddress.complement || "",
					neighborhood: defaultAddress.neighborhood || "",
					city: defaultAddress.city || "",
					state: defaultAddress.state || "",
				})
				: null;

			setSavedAddresses(mappedAddresses);
			setActiveAddressKey(defaultAddressKey);

			setZipCode("");
			setStreet("");
			setNumber("");
			setComplement("");
			setNeighborhood("");
			setCity("");
			setState("");
			setZipCodeFeedback(null);
			setIsLoadingZipCode(false);
		});

		return () => {
			cancelled = true;
		};
	}, [user]);

	useEffect(() => {
		const normalizedZipCode = normalizeZipCode(zipCode);

		if (normalizedZipCode.length < 8) {
			return;
		}

		const controller = new AbortController();

		async function loadZipCodeData() {
			setIsLoadingZipCode(true);
			setZipCodeFeedback(null);

			try {
				const response = await fetch(`https://viacep.com.br/ws/${normalizedZipCode}/json/`, {
					signal: controller.signal,
					cache: "no-store",
				});

				if (!response.ok) {
					throw new Error("Nao foi possivel consultar o CEP.");
				}

				const data = (await response.json()) as ViaCepResponse;

				if (data.erro) {
					setZipCodeFeedback("CEP nao encontrado.");
					return;
				}

				setStreet(data.logradouro || "");
				setNeighborhood(data.bairro || "");
				setCity(data.localidade || "");
				setState(data.uf || "");
			} catch (error) {
				if (controller.signal.aborted) {
					return;
				}

				setZipCodeFeedback(error instanceof Error ? error.message : "Nao foi possivel consultar o CEP.");
			} finally {
				if (!controller.signal.aborted) {
					setIsLoadingZipCode(false);
				}
			}
		}

		void loadZipCodeData();

		return () => {
			controller.abort();
		};
	}, [zipCode]);

	async function handleRegister(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (registerPasswordMismatch) {
			setRegisterFeedback("As senhas nao coincidem.");
			return;
		}

		if (!registerAcceptedTerms) {
			setRegisterFeedback("Voce precisa aceitar os termos para criar uma conta.");
			return;
		}

		setIsRegistering(true);
		setRegisterFeedback(null);

		try {
			await signup({
				name: registerName,
				email: registerEmail,
				password: registerPassword,
			});
			setRegisterFeedback("Conta criada com sucesso. Seus dados estao disponiveis abaixo.");
		} catch (error) {
			setRegisterFeedback(error instanceof Error ? error.message : "Nao foi possivel criar a conta.");
		} finally {
			setIsRegistering(false);
		}
	}

	async function handleUpdateProfile(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const requiredAddressFields = [zipCode, street, number, neighborhood, city, state];
		const hasAnyAddressField = [...requiredAddressFields, complement].some((value) => value.trim().length > 0);

		if (hasAnyAddressField && requiredAddressFields.some((value) => value.trim().length === 0)) {
			setProfileFeedback("Preencha todos os campos obrigatorios do novo endereco.");
			return;
		}

		setIsSavingProfile(true);
		setProfileFeedback(null);

		const normalizedZipCode = normalizeZipCode(zipCode);
		const trimmedStreet = street.trim();
		const trimmedNumber = number.trim();
		const trimmedComplement = complement.trim();
		const trimmedNeighborhood = neighborhood.trim();
		const trimmedCity = city.trim();
		const trimmedState = state.trim();

		try {
			await updateProfile({
				name,
				email,
				cpf,
				phone,
				address: hasAnyAddressField
					? {
						zipCode: normalizedZipCode,
						street: trimmedStreet,
						number: trimmedNumber,
						complement: trimmedComplement,
						neighborhood: trimmedNeighborhood,
						city: trimmedCity,
						state: trimmedState,
						isDefault: true,
					}
					: undefined,
			});

			if (hasAnyAddressField) {
				const nextAddressBase = {
					zipCode: formatZipCode(normalizedZipCode),
					street: trimmedStreet,
					number: trimmedNumber,
					complement: trimmedComplement,
					neighborhood: trimmedNeighborhood,
					city: trimmedCity,
					state: trimmedState,
				};
				const nextAddressKey = buildAddressKey(nextAddressBase);

				setSavedAddresses((currentAddresses) => [
					{
						key: nextAddressKey,
						...nextAddressBase,
					},
					...currentAddresses.filter((address) => address.key !== nextAddressKey),
				]);
				setActiveAddressKey(nextAddressKey);
				setZipCode("");
				setStreet("");
				setNumber("");
				setComplement("");
				setNeighborhood("");
				setCity("");
				setState("");
				setZipCodeFeedback(null);
				setIsLoadingZipCode(false);
			}

			setProfileFeedback("Dados atualizados com sucesso.");
		} catch (error) {
			setProfileFeedback(error instanceof Error ? error.message : "Nao foi possivel atualizar seus dados.");
		} finally {
			setIsSavingProfile(false);
		}
	}

	return {
		isAuthenticated,
		isLoading,
		registerName,
		registerEmail,
		registerPassword,
		registerConfirmPassword,
		registerAcceptedTerms,
		registerPasswordMismatch,
		registerFeedback,
		isRegistering,
		name,
		email,
		cpf,
		phone,
		zipCode: formatZipCode(zipCode),
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
		savedAddresses,
		activeAddressKey,
		handleRegister,
		handleUpdateProfile,
		setActiveAddressKey,
		setRegisterName,
		setRegisterEmail,
		setRegisterPassword,
		setRegisterConfirmPassword,
		setRegisterAcceptedTerms,
		setName,
		setEmail,
		setCpf,
		setPhone,
		setZipCode: (value: string) => {
			setZipCode(normalizeZipCode(value));
			setZipCodeFeedback(null);
			setIsLoadingZipCode(false);
		},
		setStreet,
		setNumber,
		setComplement,
		setNeighborhood,
		setCity,
		setState,
	};
}