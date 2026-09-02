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

export interface StoreBranding {
  store_name: string;
  logo_url: string | null;
  logo_position: string | null;
  logo_dark_url: string | null;
  logo_dark_position: string | null;
  favicon_url: string | null;
  favicon_position: string | null;
  banner_home_url: string | null;
  banner_home_position: string | null;
  banner_home_mobile_url: string | null;
  banner_home_mobile_position: string | null;
  og_image_url: string | null;
  og_image_position: string | null;
  about_image_url: string | null;
  primary_color: string;
  primary_foreground: string | null;
  secondary_color: string;
  background_color: string;
  text_color: string;
  header_background: string | null;
  footer_background: string | null;
  font_heading: string | null;
  font_body: string | null;
  border_radius: string | null;
  topbar_announcement: string | null;
  topbar_active: boolean;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_cta_text: string | null;
  featured_title: string | null;
  featured_subtitle: string | null;
  featured_cta_text: string | null;
  newsletter_title: string | null;
  newsletter_subtitle: string | null;
  newsletter_cta_text: string | null;
  about_eyebrow: string | null;
  about_title: string | null;
  about_description: string | null;
  about_story_title: string | null;
  about_story_text: string | null;
  about_mission_title: string | null;
  about_mission_text: string | null;
  about_quote: string | null;
  about_quote_author: string | null;
  about_values_title: string | null;
  about_value_1_title: string | null;
  about_value_1_text: string | null;
  about_value_2_title: string | null;
  about_value_2_text: string | null;
  about_value_3_title: string | null;
  about_value_3_text: string | null;
  category_1_id?: string | null;
  category_1_image?: string | null;
  category_2_id?: string | null;
  category_2_image?: string | null;
  category_3_id?: string | null;
  category_3_image?: string | null;
  category_4_id?: string | null;
  category_4_image?: string | null;
  footer_about_text: string | null;
  copyright_text: string | null;
  whatsapp_number: string | null;
  whatsapp_default_message: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
  support_email: string;
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

export async function fetchStoreBranding(): Promise<StoreBranding | null> {
  try {
    const res = await fetch(`${API_URL}/store-config/branding/public`, {
      cache: 'no-store',
      headers: buildHeaders(),
    });

    if (!res.ok) return null;
    return parseJsonSafely<StoreBranding>(res);
  } catch {
    return null;
  }
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

export interface CreateOrderItemPayload {
  productId: string;
  size: string;
  quantity: number;
}

export interface OrderResponse {
  id: string;
  totalAmount: number;
}

export async function createOrder(
  token: string,
  payload: { items: CreateOrderItemPayload[]; shippingCost?: number },
) {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: buildHeaders(token, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
  });

  const data = await parseJsonSafely<OrderResponse & { message?: string }>(res);

  if (!res.ok || !data) {
    throw new Error(data?.message ?? 'Nao foi possivel criar o pedido.');
  }

  return data;
}

export interface ApiCustomerOrderItem {
  id: string;
  quantity: number;
  price: number;
  variantId: string;
  variant: {
    id?: string;
    size: string;
    sku: string;
    color?: string | null;
    product: {
      id: string;
      name: string;
      slug: string;
      images?: Array<{ url: string; altText: string | null }>;
    };
  };
}

export interface ApiCustomerOrder {
  id: string;
  orderNumber: number;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELED";
  totalAmount: number;
  tenantId: string;
  customerName: string;
  customerEmail: string;
  customerCpf: string;
  customerPhone: string;
  shippingZip: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingService: string;
  shippingCost: number;
  trackingCode?: string | null;
  paymentId?: string | null;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  items: ApiCustomerOrderItem[];
}

export async function fetchCustomerOrders(token: string): Promise<ApiCustomerOrder[]> {
  const res = await fetch(`${API_URL}/orders`, {
    cache: 'no-store',
    headers: buildHeaders(token),
  });

  const data = await parseJsonSafely<ApiCustomerOrder[]>(res);

  if (!res.ok) {
    throw new Error('Não foi possível carregar seus pedidos.');
  }

  return Array.isArray(data) ? data : [];
}

export interface PixPaymentResponse {
  paymentId: string;
  status: string;
  qrCode?: string;
  qrCodeBase64?: string;
  ticketUrl?: string;
}

export async function createPixPayment(payload: { orderId: string; amount: number; email: string }) {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await parseJsonSafely<PixPaymentResponse & { message?: string }>(res);

  if (!res.ok || !data) {
    throw new Error(data?.message ?? 'Nao foi possivel gerar o pagamento PIX.');
  }

  return data;
}


