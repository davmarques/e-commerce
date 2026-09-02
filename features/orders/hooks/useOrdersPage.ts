"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiCustomerOrder, fetchCustomerOrders } from "@/app/services/api";
import { useAuth } from "@/providers/AuthContext";

export function useOrdersPage() {
  const { isAuthenticated, isLoading: isLoadingAuth, token, user, login } = useAuth();
  const [orders, setOrders] = useState<ApiCustomerOrder[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isQuickLoggingIn, setIsQuickLoggingIn] = useState(false);
  const [copiedTrackingId, setCopiedTrackingId] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    if (!token) {
      setOrders([]);
      return;
    }

    setIsLoadingOrders(true);
    setError(null);
    try {
      const data = await fetchCustomerOrders(token);
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível carregar os pedidos.");
    } finally {
      setIsLoadingOrders(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      void loadOrders();
    } else {
      setOrders([]);
    }
  }, [isAuthenticated, token, loadOrders]);

  const handleQuickLogin = async (email: string) => {
    setIsQuickLoggingIn(true);
    setError(null);
    try {
      await login({ email, password: "cliente123" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao autenticar com usuário de teste.");
    } finally {
      setIsQuickLoggingIn(false);
    }
  };

  const handleCopyTracking = (code: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(code);
      setCopiedTrackingId(id);
      setTimeout(() => setCopiedTrackingId(null), 2000);
    }
  };

  const filteredOrders = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesSearch =
        !query ||
        String(order.orderNumber).includes(query) ||
        (order.trackingCode && order.trackingCode.toLowerCase().includes(query)) ||
        order.items.some((item) =>
          item.variant.product.name.toLowerCase().includes(query),
        );

      const matchesStatus =
        filterStatus === "all" ||
        order.status === filterStatus ||
        (filterStatus === "PENDING" && order.status === "PENDING") ||
        (filterStatus === "PAID" && order.status === "PAID") ||
        (filterStatus === "SHIPPED" && order.status === "SHIPPED") ||
        (filterStatus === "DELIVERED" && order.status === "DELIVERED") ||
        (filterStatus === "CANCELED" && order.status === "CANCELED");

      return matchesSearch && matchesStatus;
    });
  }, [filterStatus, orders, searchTerm]);

  return {
    isAuthenticated,
    isLoading: isLoadingAuth || isLoadingOrders,
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
    refreshOrders: loadOrders,
  };
}
