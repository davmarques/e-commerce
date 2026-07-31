import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-background">
      <div className="container-tight py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-20">
          <div>
            <span className="font-display text-lg font-semibold">Forma</span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Curated essentials for modern living. Designed with intention, made to last.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  All products
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground">
                  New arrivals
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 sm:flex-row px-4 md:px-20">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Forma. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
