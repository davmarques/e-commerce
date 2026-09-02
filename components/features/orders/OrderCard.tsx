"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, CheckCircle2, Clock, Copy, CreditCard, MapPin, Package, RefreshCw, Truck, XCircle } from "lucide-react";
import type { ApiCustomerOrder } from "@/app/services/api";

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
> = {
  PENDING: {
    label: "Aguardando Pagamento",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    icon: Clock,
  },
  PAID: {
    label: "Em Separação",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    icon: Package,
  },
  SHIPPED: {
    label: "Enviado",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/30",
    icon: Truck,
  },
  DELIVERED: {
    label: "Entregue",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    icon: CheckCircle2,
  },
  CANCELED: {
    label: "Cancelado",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/30",
    icon: XCircle,
  },
};

function formatCurrency(value?: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value || 0,
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

interface OrderCardProps {
  order: ApiCustomerOrder;
  isCopied?: boolean;
  onCopyTracking?: (code: string, id: string) => void;
}

export function OrderCard({ order, isCopied = false, onCopyTracking }: OrderCardProps) {
  const statusInfo = statusConfig[order.status] || {
    label: order.status,
    bg: "bg-white/10",
    text: "text-white",
    border: "border-white/20",
    icon: Package,
  };
  const StatusIcon = statusInfo.icon;

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-brand-surface p-6 shadow-xl transition-all duration-300 hover:border-brand-primary/40 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-outfit text-xl font-bold text-white md:text-2xl">
              Pedido #{order.orderNumber}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {statusInfo.label}
            </span>
          </div>
          <p className="mt-1 text-xs text-white/50">Realizado em {formatDate(order.createdAt)}</p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-white/50">Total</p>
          <p className="font-outfit text-xl font-bold text-brand-primary md:text-2xl">
            {formatCurrency(order.totalAmount)}
          </p>
        </div>
      </div>

      {/* Tracking Banner if Shipped or Delivered */}
      {order.trackingCode && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-4">
          <div className="flex items-center gap-2 text-sm text-purple-200">
            <Truck className="h-4 w-4 text-purple-400" />
            <span>
              Código de rastreio (<strong>{order.shippingService || "SEDEX"}</strong>):
            </span>
            <span className="font-mono font-bold tracking-wider text-white">
              {order.trackingCode}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onCopyTracking?.(order.trackingCode!, order.id)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-900/40 px-3 py-1.5 text-xs font-medium text-purple-200 transition hover:bg-purple-800/60 cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copiar código
              </>
            )}
          </button>
        </div>
      )}

      {/* Items List */}
      <div className="mt-6 divide-y divide-white/5">
        {order.items.map((item) => {
          const imageUrl =
            item.variant.product.images?.[0]?.url ||
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518";

          return (
            <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-brand-dark">
                <Image
                  src={imageUrl}
                  alt={item.variant.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.variant.product.slug}`}
                  className="truncate text-sm font-semibold text-white transition hover:text-brand-primary md:text-base block"
                >
                  {item.variant.product.name}
                </Link>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/60">
                  <span className="rounded bg-white/10 px-2 py-0.5 font-medium text-white/80">
                    Tam: {item.variant.size}
                  </span>
                  {item.variant.color && (
                    <span className="text-white/50">Cor: {item.variant.color}</span>
                  )}
                  <span>• Qtd: {item.quantity}</span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-white">
                  {formatCurrency(item.quantity * item.price)}
                </p>
                {item.quantity > 1 && (
                  <p className="text-xs text-white/50">{formatCurrency(item.price)} cada</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info (Address & Payment Breakdown) */}
      <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
        {/* Shipping Address */}
        <div className="flex items-start gap-2.5 text-xs text-white/70">
          <MapPin className="h-4 w-4 flex-shrink-0 text-brand-primary mt-0.5" />
          <div>
            <p className="font-semibold text-white">Endereço de Entrega</p>
            <p className="mt-0.5">{order.shippingAddress}</p>
            <p>
              {order.shippingCity} - {order.shippingState} | CEP {order.shippingZip}
            </p>
          </div>
        </div>

        {/* Payment & Shipping cost */}
        <div className="flex flex-col justify-end space-y-1 text-xs text-white/70 sm:text-right">
          <div className="flex items-center justify-between sm:justify-end sm:gap-2">
            <span className="text-white/50">Método de pagamento:</span>
            <span className="inline-flex items-center gap-1 font-semibold text-white">
              <CreditCard className="h-3 w-3 text-brand-primary" />
              {order.paymentMethod || "PIX"}
            </span>
          </div>
          <div className="flex items-center justify-between sm:justify-end sm:gap-2">
            <span className="text-white/50">Frete ({order.shippingService || "Padrão"}):</span>
            <span className="text-white">{formatCurrency(order.shippingCost)}</span>
          </div>
          <div className="flex items-center justify-between sm:justify-end sm:gap-2">
            <span className="text-white/50">Subtotal itens:</span>
            <span className="text-white">{formatCurrency(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
