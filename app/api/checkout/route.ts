import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Sua lógica de checkout aqui
    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';