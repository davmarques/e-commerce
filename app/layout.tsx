import type { Metadata } from "next";
import {Outfit, Figtree, Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/providers/CardContext";
import { AuthProvider } from "@/providers/AuthContext";
import { WishlistProvider } from "@/providers/WishlistContext";


import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


/* import Footer from "@/components/layout/Footer"; */

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

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "E-Commerce Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn(outfit.variable, figtree.variable, "font-sans", geist.variable)}>
      <body className="antialiased">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              <main>
                {children}
              </main>
             {/*  <Footer /> */}
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
