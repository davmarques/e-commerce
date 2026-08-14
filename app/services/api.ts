const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const STORE_DOMAIN = process.env.NEXT_PUBLIC_STORE_DOMAIN || 'lojademonstracao.com.br';

export interface ApiAuthUser {
  id: string;
  name: string;
  email: string;
  cpf: string | null;
  phone: string | null;
  addresses: ApiUserAddress[];
  role: 'CLIENT' | 'ADMIN' | 'SUPERADMIN';
  tenantId: string;
}

export interface ApiUserAddress {
  id: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  isDefault: boolean;
}

export interface AuthResponse {
  token: string;
  user: ApiAuthUser;
}

export interface UpdateProfilePayload {
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

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

function buildHeaders(token?: string, extraHeaders?: HeadersInit) {
  const headers = new Headers(extraHeaders);
  headers.set('x-store-domain', STORE_DOMAIN);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
}

async function parseJsonSafely<T>(res: Response): Promise<T | null> {
  if (res.status === 204) return null;

  const raw = await res.text();
  if (!raw.trim()) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`, {
    cache: 'no-store',
    headers: buildHeaders(),
  });
  if (!res.ok) throw new Error('Falha ao carregar produtos');

  const data = await parseJsonSafely<unknown[]>(res);
  return Array.isArray(data) ? data : [];
}

export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`${API_URL}/products/${slug}`, {
    cache: 'no-store',
    headers: buildHeaders(),
  });
  if (!res.ok) return null;

  return parseJsonSafely<Record<string, unknown>>(res);
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  const res = await fetch(`${API_URL}/categories`, {
    cache: 'no-store',
    headers: buildHeaders(),
  });
  if (!res.ok) throw new Error('Falha ao carregar categorias');

  const data = await parseJsonSafely<ApiCategory[]>(res);
  return Array.isArray(data) ? data : [];
}

export async function signupUser(payload: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: buildHeaders(undefined, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
  });

  const data = await parseJsonSafely<AuthResponse>(res);

  if (!res.ok || !data) {
    throw new Error('Nao foi possivel criar a conta.');
  }

  return data;
}

export async function loginUser(payload: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: buildHeaders(undefined, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
  });

  const data = await parseJsonSafely<AuthResponse>(res);

  if (!res.ok || !data) {
    throw new Error('E-mail ou senha invalidos.');
  }

  return data;
}

export async function fetchCurrentUser(token: string) {
  const res = await fetch(`${API_URL}/auth/me`, {
    cache: 'no-store',
    headers: buildHeaders(token),
  });

  const data = await parseJsonSafely<ApiAuthUser>(res);

  if (!res.ok || !data) {
    throw new Error('Sessao invalida.');
  }

  return data;
}

export async function updateCurrentUser(token: string, payload: UpdateProfilePayload) {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: 'PATCH',
    headers: buildHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
  });

  const data = await parseJsonSafely<ApiAuthUser>(res);

  if (!res.ok || !data) {
    throw new Error('Nao foi possivel atualizar seus dados.');
  }

  return data;
}

export async function fetchFavorites(token: string) {
  const res = await fetch(`${API_URL}/favorites`, {
    cache: 'no-store',
    headers: buildHeaders(token),
  });

  const data = await parseJsonSafely<unknown[]>(res);

  if (!res.ok) {
    throw new Error('Nao foi possivel carregar os favoritos.');
  }

  return Array.isArray(data) ? data : [];
}

export async function addFavorite(productId: string, token: string) {
  const res = await fetch(`${API_URL}/favorites/${productId}`, {
    method: 'POST',
    headers: buildHeaders(token),
  });

  const data = await parseJsonSafely<Record<string, unknown>>(res);

  if (!res.ok || !data) {
    throw new Error('Nao foi possivel salvar o favorito.');
  }

  return data;
}

export async function removeFavorite(productId: string, token: string) {
  const res = await fetch(`${API_URL}/favorites/${productId}`, {
    method: 'DELETE',
    headers: buildHeaders(token),
  });

  if (!res.ok) {
    throw new Error('Nao foi possivel remover o favorito.');
  }
}
