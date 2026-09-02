"use client";

import Link from "next/link";
import { useBranding } from "@/providers/BrandingProvider";

export default function Footer() {
  const branding = useBranding();
  return (
    <footer className="border-t border-white/10 bg-background" style={{ backgroundColor: "var(--background)" }}>
      <div className="container-tight py-12 lg:py-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-20">
          <div>
            <span className="font-display text-lg font-semibold">
              {branding?.logo_url ? (
                <img src={branding.logo_url} alt={branding.store_name || "STORMS development"} className="h-16 w-auto object-contain" />
              ) : (
                <img src="/logo.png" alt="STORMS development" className="h-8 w-auto object-contain" />
              )}
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {branding?.footer_about_text || "STORMS development. Soluções inovadoras, produtos exclusivos e tecnologia de ponta."}
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-white">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <Link href="/collections" className="hover:text-brand-primary transition-colors">
                  Todos os produtos
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-brand-primary transition-colors">
                  Novidades
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-brand-primary transition-colors">
                  Destaques
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-white">Empresa</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <Link href="/about" className="hover:text-brand-primary transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-primary transition-colors">
                  Qualidade & Inovação
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-white">Suporte</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              <li>
                <Link href="/" className="hover:text-brand-primary transition-colors">
                  Entregas & Frete
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-brand-primary transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-brand-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row px-4 md:px-20">
          <p className="text-xs text-white/50">
            {branding?.copyright_text || `© ${new Date().getFullYear()} ${branding?.store_name || "STORMS development"}. Todos os direitos reservados.`}
          </p>
          <div className="flex gap-6 text-xs text-white/50">
            <Link href="/" className="hover:text-brand-primary transition-colors">
              Privacidade
            </Link>
            <Link href="/" className="hover:text-brand-primary transition-colors">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
