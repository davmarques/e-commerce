import { CartProvider } from "@/providers/CardContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}