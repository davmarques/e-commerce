"use client";

import Link from "next/link";
import { ArrowRight, Lock, LogIn, Sparkles, UserCheck } from "lucide-react";

interface OrdersAuthPromptProps {
  onQuickLogin: (email: string) => Promise<void>;
  isLoggingIn: boolean;
}

const seedUsers = [
  {
    name: "Lucas Fernandes",
    email: "lucas.fernandes@email.com",
    ordersCount: "2 pedidos (Entregue & Cancelado)",
  },
  {
    name: "Mariana Souza",
    email: "mariana.souza@email.com",
    ordersCount: "1 pedido (Entregue)",
  },
  {
    name: "Gabriel Rocha",
    email: "gabriel.rocha@email.com",
    ordersCount: "1 pedido (Enviado - Rastreio)",
  },
  {
    name: "Camila Duarte",
    email: "camila.duarte@email.com",
    ordersCount: "1 pedido (Enviado - Jadlog)",
  },
];

export function OrdersAuthPrompt({ onQuickLogin, isLoggingIn }: OrdersAuthPromptProps) {
  return (
    <div className="space-y-8">
      {/* Login Requirement Banner */}
      <div className="rounded-3xl border border-white/10 bg-brand-surface p-8 text-center shadow-xl md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-primary/30 bg-brand-primary/10 text-brand-primary">
          <Lock className="h-8 w-8" />
        </div>
        <h2 className="mt-6 font-outfit text-2xl font-bold text-white md:text-3xl">
          Acesse sua conta para ver seus pedidos
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/70 md:text-base">
          Faça login para acompanhar o status de entrega em tempo real, visualizar códigos de
          rastreio e histórico de compras.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition hover:brightness-110"
          >
            <LogIn className="h-4 w-4" />
            Entrar ou Criar Conta
          </Link>
        </div>
      </div>

      {/* Quick Test Login with Seed Accounts */}
      <div className="rounded-3xl border border-white/10 bg-brand-dark/50 p-6 md:p-8">
        <div className="flex items-center gap-2 text-brand-primary">
          <Sparkles className="h-5 w-5" />
          <h3 className="font-outfit text-lg font-bold text-white">
            Acesso Rápido com Contas da Seed
          </h3>
        </div>
        <p className="mt-1 text-xs text-white/60 md:text-sm">
          Selecione qualquer um dos clientes cadastrados no banco para testar a visualização dos pedidos:
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {seedUsers.map((seedUser) => (
            <button
              key={seedUser.email}
              type="button"
              disabled={isLoggingIn}
              onClick={() => onQuickLogin(seedUser.email)}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-brand-surface p-4 text-left transition hover:border-brand-primary/50 hover:bg-brand-surface/80 disabled:opacity-50"
            >
              <div>
                <p className="font-semibold text-white group-hover:text-brand-primary transition">
                  {seedUser.name}
                </p>
                <p className="text-xs text-white/50">{seedUser.email}</p>
                <p className="mt-1 text-[11px] font-medium text-brand-primary/90">
                  {seedUser.ordersCount}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 p-2 text-white/40 group-hover:border-brand-primary/30 group-hover:text-brand-primary">
                <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
