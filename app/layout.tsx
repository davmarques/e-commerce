import type { Metadata } from "next";
import { Outfit, Figtree, Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/providers/CardContext";
import { AuthProvider } from "@/providers/AuthContext";
import { WishlistProvider } from "@/providers/WishlistContext";
import { BrandingProvider } from "@/providers/BrandingProvider";
import { fetchStoreBranding } from "@/app/services/api";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const branding = await fetchStoreBranding().catch(() => null);
  const favicon = branding?.favicon_url || "/favicon.png";

  return {
    title: branding?.store_name || "Storms Development",
    description: "Transformando ideias em realidade",
    icons: {
      icon: [{ url: favicon }],
      shortcut: [{ url: favicon }],
      apple: [{ url: favicon }],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const brandingPromise = fetchStoreBranding();

  return <BrandingLayout brandingPromise={brandingPromise}>{children}</BrandingLayout>;
}

async function BrandingLayout({
  brandingPromise,
  children,
}: {
  brandingPromise: ReturnType<typeof fetchStoreBranding>;
  children: React.ReactNode;
}) {
  const branding = await brandingPromise;
  const radius = {
    none: "0px",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    full: "9999px",
  }[branding?.border_radius || "md"] || "0.5rem";
  const style = {
    "--background": branding?.background_color || "#000932",
    "--foreground": branding?.text_color || "#FFFFFF",
    "--primary": branding?.primary_color || "#009BFF",
    "--primary-foreground": branding?.primary_foreground || "#FFFFFF",
    "--secondary": branding?.secondary_color || "#E8368F",
    "--header-background": branding?.header_background || branding?.background_color || "#000932",
    "--footer-background": branding?.footer_background || branding?.background_color || "#000932",
    "--radius": radius,
    "--font-brand-heading": branding?.font_heading,
    "--font-brand-body": branding?.font_body,
  } as React.CSSProperties;

  const faviconUrl = branding?.favicon_url || "/favicon.png";

  return (
    <html lang="pt-BR" className={cn(outfit.variable, figtree.variable, "font-sans", geist.variable)} style={style}>
      <head>
        <link rel="icon" href={faviconUrl} sizes="any" />
        <link rel="shortcut icon" href={faviconUrl} />
        <link rel="apple-touch-icon" href={faviconUrl} />
      </head>
      <body className="antialiased bg-background text-foreground">
        <BrandingProvider branding={branding}>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <Header />
                <main>{children}</main>
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </BrandingProvider>
      </body>
    </html>
  );
}
