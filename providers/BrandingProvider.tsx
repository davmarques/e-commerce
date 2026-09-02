"use client";

import { createContext, useContext, useEffect } from "react";
import type { StoreBranding } from "@/app/services/api";

const BrandingContext = createContext<StoreBranding | null>(null);

export function BrandingProvider({
  branding,
  children,
}: {
  branding: StoreBranding | null;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const faviconUrl = branding?.favicon_url || "/favicon.png";
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = faviconUrl;

    let shortcutLink = document.querySelector<HTMLLinkElement>("link[rel='shortcut icon']");
    if (!shortcutLink) {
      shortcutLink = document.createElement("link");
      shortcutLink.rel = "shortcut icon";
      document.head.appendChild(shortcutLink);
    }
    shortcutLink.href = faviconUrl;

    let appleLink = document.querySelector<HTMLLinkElement>("link[rel='apple-touch-icon']");
    if (!appleLink) {
      appleLink = document.createElement("link");
      appleLink.rel = "apple-touch-icon";
      document.head.appendChild(appleLink);
    }
    appleLink.href = faviconUrl;
  }, [branding?.favicon_url]);

  return <BrandingContext.Provider value={branding}>{children}</BrandingContext.Provider>;
}

export function useBranding() {
  return useContext(BrandingContext);
}