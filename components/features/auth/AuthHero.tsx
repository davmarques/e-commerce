export function AuthHero() {
  const benefits = [
    "Checkout mais rapido com dados salvos",
    "Historico completo de pedidos e entregas",
    "Acesso antecipado a novidades da colecao",
  ];

  return (
    <aside className="relative overflow-hidden rounded-3xl border border-white/10 bg-brand-surface p-8 md:p-12 shadow-xl">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-brand-secondary/10 blur-3xl" />

      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-brand-dark px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-brand-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
          Área do cliente
        </p>

        <h1 className="mt-5 font-outfit text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
          Sua conta,
          <br />
          do seu jeito.
        </h1>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
          Entre para acompanhar pedidos, salvar favoritos e finalizar compras com menos etapas.
        </p>

        <ul className="mt-10 grid gap-3 text-sm text-white/80">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-brand-dark/70 px-4 py-3"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-primary" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl border border-white/10 bg-brand-dark/70 px-4 py-3 text-sm text-white/70">
          Conta gratuita e ativação imediata.
        </div>
      </div>
    </aside>
  );
}
