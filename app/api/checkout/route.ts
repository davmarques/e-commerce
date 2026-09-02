import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const STORE_DOMAIN = process.env.NEXT_PUBLIC_STORE_DOMAIN || 'lojademonstracao.com.br';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const response = await fetch(`${API_URL}/payments/pix`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, storeDomain: payload.storeDomain ?? STORE_DOMAIN }),
    });
    const data = await response.json().catch(() => null);

    return NextResponse.json(data ?? {}, { status: response.status });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';