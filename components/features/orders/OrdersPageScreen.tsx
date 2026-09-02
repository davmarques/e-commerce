"use client";

import Link from "next/link";
import { LogOut, Package, RefreshCw, Search, ShoppingBag } from "lucide-react";
import { useAuth } from "@/providers/AuthContext";
import { useOrdersPage } from "@/features/orders/hooks/useOrdersPage";
import { OrderCard } from "./OrderCard";
import { OrdersAuthPrompt } from "./OrdersAuthPrompt";

const filterTabs = [
  { id: "all", label: "Todos" },
  { id: "PENDING", label: "Aguardando Pagamento" },
  { id: "PAID", label: "Em Separação" },
  { id: "SHIPPED", label: "Enviados" },
  { id: "DELIVERED", label: "Entregues" },
  { id: "CANCELED", label: "Cancelados" },
];

export function OrdersPageScreen() {
  const { logout } = useAuth();
  const {
    isAuthenticated,
    isLoading,
    user,
    orders,
    filteredOrders,
    error,
    filterStatus,
    searchTerm,
    isQuickLoggingIn,
    copiedTrackingId,
    setFilterStatus,
    setSearchTerm,
    handleQuickLogin,
    handleCopyTracking,
    refreshOrders,
  } = useOrdersPage();

  return (
    <section className="min-h-[calc(100vh-80px)] bg-brand-background px-4 py-10 md:px-20 md:py-14">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Main Page Title Header */}
        <div className="rounded-3xl border border-white/10 bg-brand-surface p-8 shadow-xl md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-primary">
                Área do Cliente
              </p>
              <h1 className="mt-2 font-outfit text-3xl font-bold text-white md:text-5xl">
                Meus Pedidos
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
                Acompanhe o status dos seus pedidos, códigos de rastreio e detalhes de entrega.
              </p>
            </div>

            {isAuthenticated && user && (
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-brand-dark/60 p-3">
                <div className="text-right text-xs">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-white/50">{user.email}</p>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  title="Sair da conta"
                  className="rounded-xl border border-white/10 p-2 text-white/60 transition hover:border-rose-500/40 hover:text-rose-400 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Feedback */}
        {error && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
            {error}
          </div>
        )}

        {/* Content Section */}
        {isLoading || isQuickLoggingIn ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-brand-surface p-16 text-center text-white/60">
            <RefreshCw className="h-8 w-8 animate-spin text-brand-primary" />
            <p className="mt-4 text-sm font-medium">Carregando seus pedidos...</p>
          </div>
        ) : !isAuthenticated ? (
          <OrdersAuthPrompt
            onQuickLogin={handleQuickLogin}
            isLoggingIn={isQuickLoggingIn}
          />
        ) : (
          <div className="space-y-6">
            {/* Search and Filters Toolbar */}
            <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-brand-surface p-4 shadow-xl sm:flex-row sm:items-center sm:justify-between sm:p-6">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Buscar por nº do pedido, produto ou rastreio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-brand-dark/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                />
              </div>

              {/* Status pills */}
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
                {filterTabs.map((tab) => {
                  const isActive = filterStatus === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setFilterStatus(tab.id)}
                      className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? "bg-brand-primary text-white shadow-md shadow-brand-primary/25"
                          : "border border-white/10 bg-brand-dark/40 text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length > 0 ? (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    isCopied={copiedTrackingId === order.id}
                    onCopyTracking={handleCopyTracking}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-brand-surface p-16 text-center shadow-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-brand-dark/60 text-white/40">
                  <Package className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-outfit text-xl font-bold text-white">
                  {orders.length === 0
                    ? "Você ainda não possui pedidos"
                    : "Nenhum pedido encontrado com este filtro"}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-white/60">
                  {orders.length === 0
                    ? "Explore nossa coleção de produtos e realize sua primeira compra."
                    : "Tente buscar com outros termos ou limpar os filtros aplicados."}
                </p>
                <div className="mt-6">
                  <Link
                    href="/collections/all"
                    className="inline-flex items-center gap-2 rounded-2xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition hover:brightness-110"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Explorar Produtos
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
